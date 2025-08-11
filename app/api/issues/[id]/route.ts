import { issueSchema } from "@/app/validationIssueSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { setTimeout } from "node:timers/promises";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();
    const validation =  issueSchema.safeParse(body);

    if (!validation.success) 
        return NextResponse.json({error: validation.error}, {status: 400} );

    const issue = await  prisma.issue.findUnique({
        where: { id } 
    })

    if (!issue)
         return NextResponse.json({error: 'Invalparams. issue'}, {status: 404} );

    const updateIssue = await prisma.issue.update({
        where: { id } ,
        data: {
            title: validation.data.title,
            description: validation.data.description,
        }
    })
    return NextResponse.json(updateIssue);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const issue = await  prisma.issue.findUnique({
    where: { id } 
    })
    if (!issue)
        return NextResponse.json({error: 'Invalparams. issue'}, {status: 404} );

    const deleteIssue = await prisma.issue.delete({
        where: { id }
    })

    return NextResponse.json({});

}    