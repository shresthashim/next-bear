"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useTaskStore } from "@/lib/store";

export default function AddTodo() {
  const addTask = useTaskStore((state) => state.addTask);

  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) return;

    addTask(title, description);
    setTitle("");
    setDescription("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='sm' onClick={() => setIsOpen(true)}>
          ＋ Add New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogDescription>What do you want to get done today?</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Input
              id='title'
              placeholder='Todo title...'
              className='col-span-4'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Textarea
              id='description'
              placeholder='Description...'
              className='col-span-4'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type='submit' size='sm'>
              Add Todo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
