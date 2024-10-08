"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useAppContext } from '@/contexts/AppContext'

export default function BingoCard() {
  const { code } = useParams()
  const [selectedItems, setSelectedItems] = useState(new Set())
  const { toast } = useToast()
  const { currentCard } = useAppContext()

  useEffect(() => {
    if (!currentCard || currentCard.id !== code) {
      toast({
        title: "Error",
        description: "Bingo card not found",
        variant: "destructive",
      })
    }
  }, [currentCard, code, toast])

  const toggleItem = (item: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(item)) {
        newSet.delete(item)
      } else {
        newSet.add(item)
      }
      return newSet
    })
  }

  if (!currentCard) {
    return <div>Loading...</div>
  }

  const shuffledItems = [...currentCard.items].sort(() => Math.random() - 0.5).slice(0, 25)

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{currentCard.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {shuffledItems.map((item, index) => (
              <Button
                key={index}
                variant={selectedItems.has(item) ? "default" : "outline"}
                className="h-24 text-xs"
                onClick={() => toggleItem(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}