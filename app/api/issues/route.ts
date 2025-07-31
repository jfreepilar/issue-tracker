import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { createIssueSchema } from "../../createIssueSchema";

export async function POST(req:NextRequest, res:NextResponse) {
    const body = await req.json();
    const validate = createIssueSchema.safeParse(body);

    if (!validate.success) {
        return NextResponse.json(
            {error: validate.error},
            {status: 400}
        )
    }
    
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json(
        newIssue,
        {status: 201}
    )
}

