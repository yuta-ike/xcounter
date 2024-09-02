import { NextResponse } from "next/server"

type GetContext = {
  params: {
    id: string
  }
}

export const GET = (request: Request, { params }: GetContext) => {
  const id = params.id
  return NextResponse.json({ body: `Hello, ${id}!` })
}
