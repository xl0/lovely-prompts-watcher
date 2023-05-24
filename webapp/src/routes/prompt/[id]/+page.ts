import { user, pb }  from "$lib/pocketbase";
import { onMount } from "svelte";

// import Login from '$lib/components/Login.svelte';

export async function  load({params}) {

    // let prompt = ;
    return { ... await pb.collection("prompts").getOne(params.id, {expand: "replies(prompt)"}) };

    // .get(params.id, {
    //     expand: "replies(prompt)",
    //     fields: "id, title, comment, updated," +
    //             "expand.replies(prompt).id, expand.replies(prompt).title, expand.replies(prompt).comment," +
    //             "expand.replies(prompt).updated, expand.replies(prompt).meta," +
    //             "expand.replies(prompt).tok_in, expand.replies(prompt).tok_out, expand.replies(prompt).tok_max",
    // });
}