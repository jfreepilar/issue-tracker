import { issueSchema } from "@/app/validationIssueSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params : {id : string} 
}

export async function PATCH( 
    req: NextRequest,
    {params} : Props) {
        const body = await req.json();
        const validation =  issueSchema.safeParse(body);

        if (!validation.success) 
            return NextResponse.json({error: validation.error}, {status: 400} );

        const issue = await  prisma.issue.findUnique({
            where: { id: params.id } 
        })

        if (!issue)
             return NextResponse.json({error: 'Invalid issue'}, {status: 404} );

        const updateIssue = await prisma.issue.update({
            where: { id: params.id } ,
            data: {
                title: validation.data.title,
                description: validation.data.description,
            }
        })
        return NextResponse.json(updateIssue);
}