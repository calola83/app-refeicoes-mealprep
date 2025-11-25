'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChefHat, ArrowLeft, ShoppingCart } from 'lucide-react'

interface Meal {
  day: string
  breakfast: string
  lunch: string
  dinner: string
}

export default function CardapioPage() {
  const searchParams = useSearchParams()
  const ingredientsParam = searchParams.get('ingredients')
  const [ingredients, setIngredients] = useState<string[]>([])
  const [meals, setMeals] = useState<Meal[]>([])

  useEffect(() => {
    if (ingredientsParam) {
      try {
        const parsedIngredients = JSON.parse(decodeURIComponent(ingredientsParam))
        setIngredients(parsedIngredients)
        generateMealPlan(parsedIngredients)
      } catch (error) {
        console.error('Erro ao parsear ingredientes:', error)
      }
    }
  }, [ingredientsParam])

  const generateMealPlan = (ingredients: string[]) => {
    // Lógica simples para gerar cardápio baseado nos ingredientes
    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']

    const mockMeals: Meal[] = days.map(day => ({
      day,
      breakfast: 'Café da manhã com frutas e pão',
      lunch: 'Salada de alface com tomate e cebola',
      dinner: 'Arroz, feijão e ovo'
    }))

    // Personalizar baseado nos ingredientes
    if (ingredients.includes('tomate') && ingredients.includes('cebola')) {
      mockMeals.forEach(meal => {
        meal.lunch = 'Salada de tomate e cebola'
      })
    }

    if (ingredients.includes('arroz') && ingredients.includes('feijão')) {
      mockMeals.forEach(meal => {
        meal.dinner = 'Arroz e feijão'
      })
    }

    setMeals(mockMeals)
  }

  const generateShoppingList = () => {
    // Gerar lista de compras baseada no cardápio
    const shoppingItems = new Set<string>()

    meals.forEach(meal => {
      // Simples: adicionar itens comuns
      shoppingItems.add('Frutas')
      shoppingItems.add('Pão')
      shoppingItems.add('Alface')
      shoppingItems.add('Tomate')
      shoppingItems.add('Cebola')
      shoppingItems.add('Arroz')
      shoppingItems.add('Feijão')
      shoppingItems.add('Ovo')
    })

    return Array.from(shoppingItems)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-blue-600" />
            Cardápio Semanal
          </h1>
        </header>

        {ingredients.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Baseado nos alimentos:</h2>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-6">Seu Cardápio</h2>

          <div className="space-y-4">
            {meals.map((meal, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{meal.day}</h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-blue-600">Café da manhã:</span> {meal.breakfast}
                  </div>
                  <div>
                    <span className="font-medium text-green-600">Almoço:</span> {meal.lunch}
                  </div>
                  <div>
                    <span className="font-medium text-orange-600">Jantar:</span> {meal.dinner}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href={`/lista?shopping=${encodeURIComponent(JSON.stringify(generateShoppingList()))}`}
            className="inline-flex items-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700"
          >
            <ShoppingCart className="w-5 h-5" />
            Gerar Lista de Compras
          </Link>
        </div>
      </div>
    </div>
  )
}