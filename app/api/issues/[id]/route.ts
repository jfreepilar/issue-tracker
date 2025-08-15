import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validationIssueSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();
    const validation =  issueSchema.safeParse(body);
    const session = await getServerSession(authOptions);

    if (!session) return NextResponse.json({}, {status: 401});

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

export async function DELETE(res: NextResponse, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) return NextResponse.json({}, {status: 401});

    const issue = await  prisma.issue.findUnique({
    where: { id } 
    })
    if (!issue)
        return NextResponse.json({error: 'Invalparams. issue'}, {status: 404} );

    await prisma.issue.delete({
        where: { id }
    })

    return NextResponse.json({});

}    