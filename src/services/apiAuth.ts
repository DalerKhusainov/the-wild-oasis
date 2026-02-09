import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function signup({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error?.message);
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}) {
  // 1. Update password OR fullName
  let data; // Для хранения результата

  // Обновляем пароль, если он указан
  if (password) {
    const { data: passwordData, error: passwordError } =
      await supabase.auth.updateUser({ password });

    if (passwordError) throw new Error(passwordError.message);
    data = passwordData;
  }

  // Обновляем имя, если оно указано
  if (fullName) {
    const { data: nameData, error: nameError } = await supabase.auth.updateUser(
      {
        data: { fullName },
      }
    );

    if (nameError) throw new Error(nameError.message);
    data = nameData;
  }

  // Если ничего не обновляли, получаем текущего пользователя
  if (!password && !fullName) {
    const { data: currentUser } = await supabase.auth.getUser();
    data = currentUser;
  }

  // const { data: updateData, error } = await supabase.auth.updateUser(data);
  // if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data?.user?.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return { updatedUser };
}
