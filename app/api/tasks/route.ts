import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const { id, name, completed } = await request.json();
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ id, name, completed }])
    .select();

  return NextResponse.json({ message: "タスク追加成功", data }, { status: 201 });
}

export async function GET() {
  const { data, error } = await supabase
    .from("tasks")
    .select("id, name, completed");

  return NextResponse.json({ tasks: data }, { status: 200 });
}

export async function PUT(request: Request) {
  const { id, name, completed } = await request.json();
  const { data, error } = await supabase
    .from("tasks")
    .update({ name, completed })
    .eq("id", id);

  return NextResponse.json({ message: "タスク更新成功", data }, { status: 200 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  return NextResponse.json({ message: "タスク削除成功" }, { status: 200 });
}
