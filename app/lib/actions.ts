"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { auth } from "@/auth";

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
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
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
  try {
    await sql`DELETE FROM pages WHERE id = ${id}`;
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

const CreatePageFormSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  state: z.string(),
  date: z.string(),
});

const CreatePage = CreatePageFormSchema.omit({
  id: true,
  userId: true,
  state: true,
  date: true,
});

export async function createPage(prevState: State, formData: FormData) {
  const session = await auth();

  const validatedFields = CreatePage.safeParse({
    title: formData.get("title"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Page.",
    };
  }

  // Prepare data for insertion into the database
  const { title } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];
  const userId = session?.user?.id;
  try {
    await sql`
      INSERT INTO pages (user_id, title, html, date)
      VALUES (${userId}, ${title}, '', ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Page.",
    };
  }
  revalidatePath("/admin/landing-pages/");
  redirect("/admin/landing-pages/");
}

export async function updatePageHtml(id: string, formData: FormData) {
  const html = formData.get("html") as string;
  const session = await auth();
  const userId = session?.user?.id;

  try {
    await sql`
      UPDATE pages
      SET html = ${html}
      WHERE id = ${id}
      and user_id = ${userId}
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Page.",
    };
  }

  revalidatePath("/admin/landing-pages/");
  redirect("/admin/landing-pages/");
}
