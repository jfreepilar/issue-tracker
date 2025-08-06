import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { issueSchema } from "../../validationIssueSchema";

export async function POST(req:NextRequest, res:NextResponse) {
    const body = await req.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(
            {error: validation.error},
            {status: 400}
        )
    }
    
    const newIssue = await prisma.issue.create({
        data: {
            title: validation.data.title,
            description: validation.data.title
        }
    });

    return NextResponse.json(
        newIssue,
        {status: 201}
    )
}

