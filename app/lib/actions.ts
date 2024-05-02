"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export type SignUpState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmpassword?: string[];
      };
      message?: string | null;
    }
  | undefined;

const SignUpFormSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  });

export async function signUp(prevState: SignUpState, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmpassword: formData.get("confirmpassword"),
  });
  // return 'Something went wrong.';
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error. Failed to Create Account.",
    };
  }

  // Prepare data for insertion into the database
  const { name, email, password, confirmpassword } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Account.",
    };
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function deletePage(id: string) {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    await prisma.pages.delete({
      where: {
        id: id,
        userId: userId,
      },
    });
    revalidatePath("/admin/landing-pages");
    return { message: "Deleted Page." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Page." };
  }
}

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

export async function createPage(title: string) {
  const session = await auth();
  const userId = session?.user?.id;
  let page;
  if (userId) {
    try {
      page = await prisma.pages.create({
        data: {
          title: title,
          html: "",
          date: new Date(),
          userId: userId,
        },
      });
    } catch (error) {
      return {
        message: "Database Error: Failed to Create Page.",
      };
    }
  }
  revalidatePath("/admin/landing-pages/");
  if (page) {
    redirect(`/admin/landing-pages/${page.id}/edit`);
  } else {
    redirect("/admin/landing-pages/");
  }
}

export async function updatePageHtml(id: string, formData: FormData) {
  const html = formData.get("html") as string;
  const session = await auth();
  const userId = session?.user?.id;
  try {
    await prisma.pages.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        html: html,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Page.",
    };
  }

  revalidatePath("/admin/landing-pages/");
  redirect("/admin/landing-pages/");
}

export type PageTitleState = {
  errors?: {
    title?: string[];
    url?: string[];
    state?: string[];
  };
  message?: string | null;
};

const PageTitleFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  state: z.enum(["draft", "published"]),
});

const PageTitleForm = PageTitleFormSchema.omit({ id: true });

export async function updatePageTitle(
  id: string,
  prevState: State,
  formData: FormData
) {
  const session = await auth();
  const userId = session?.user?.id;
  const { title, url, state } = PageTitleForm.parse({
    title: formData.get("title"),
    url: formData.get("url"),
    state: formData.get("state"),
  });

  try {
    await prisma.pages.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        title: title,
        url: url,
        state: state,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Page.",
    };
  }
  revalidatePath(`/admin/landing-pages/${id}/edit`);
  redirect(`/admin/landing-pages/${id}/edit`);
}

export type MetaDataState = {
  errors?: {
    metatitle?: string[];
    metadescription?: string[];
    metakeywords?: string[];
  };
  message?: string | null;
};

const PageMetaFormSchema = z.object({
  id: z.string(),
  metatitle: z.string(),
  metadescription: z.string(),
  metakeywords: z.string(),
});

const PageMetaForm = PageMetaFormSchema.omit({ id: true });

export async function updateMetaData(
  id: string,
  prevState: MetaDataState,
  formData: FormData
) {
  const session = await auth();
  const userId = session?.user?.id;
  const { metatitle, metadescription, metakeywords } = PageMetaForm.parse({
    metatitle: formData.get("metatitle"),
    metadescription: formData.get("metadescription"),
    metakeywords: formData.get("metakeywords"),
  });
  try {
    await prisma.pages.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        metatitle: metatitle,
        metadescription: metadescription,
        metakeywords: metakeywords,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Page.",
    };
  }

  revalidatePath(`/admin/landing-pages/${id}/edit`);
  redirect(`/admin/landing-pages/${id}/edit`);
}
