"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useAppContext } from '@/contexts/AppContext'

export default function CreateBingoCard() {
  const [title, setTitle] = useState('')
  const [items, setItems] = useState('')
  const router = useRouter()
  const { toast } = useToast()
  const { setCurrentCard } = useAppContext()

  const handleCreate = () => {
    if (!title || !items) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const itemList = items.split('\n').filter(item => item.trim() !== '')
    if (itemList.length < 25) {
      toast({
        title: "Error",
        description: "Please provide at least 25 items for the bingo card",
        variant: "destructive",
      })
      return
    }

    const code = Math.random().toString(36).substring(2, 9)
    const newCard = { id: code, title, items: itemList }
    setCurrentCard(newCard)

    toast({
      title: "Success",
      description: "Bingo card created successfully!",
    })

    router.push(`/bingo/${code}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Bingo Card</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter bingo card title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="items">Bingo Items (one per line, minimum 25)</Label>
            <Textarea
              id="items"
              placeholder="Enter bingo items, one per line"
              value={items}
              onChange={(e) => setItems(e.target.value)}
              rows={10}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreate} className="w-full">Create Bingo Card</Button>
        </CardFooter>
      </Card>
    </div>
  )
}