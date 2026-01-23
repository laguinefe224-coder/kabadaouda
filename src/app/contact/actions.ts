"use server";

import { z } from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/server";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function sendMessage(values: z.infer<typeof formSchema>) {
    const validatedFields = formSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error("Invalid fields");
    }

    if (!db) {
        console.error("Firestore is not initialized on the server. Message cannot be sent.");
        throw new Error("Could not send message due to a server configuration error.");
    }

    try {
        await addDoc(collection(db, "messages"), {
            ...validatedFields.data,
            createdAt: serverTimestamp(),
            status: "unread",
        });
    } catch (error) {
        console.error("Error writing to Firestore: ", error);
        throw new Error("Could not send message.");
    }
}
