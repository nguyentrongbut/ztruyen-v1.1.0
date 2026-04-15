import { NextRequest } from "next/server";
import {CONFIG_API} from "@/configs/api";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const query = searchParams.toString();

    const res = await fetch(
        `${CONFIG_API.COMIC.INDEX}?${query}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    const data = await res.json();

    return Response.json(data, {
        status: res.status,
    });
}