'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ShoppingCart, ArrowLeft, Check } from 'lucide-react'

interface ShoppingItem {
  name: string
  checked: boolean
}

export default function ListaPage() {
  const searchParams = useSearchParams()
  const shoppingParam = searchParams.get('shopping')
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([])

  useEffect(() => {
    if (shoppingParam) {
      try {
        const parsedShopping = JSON.parse(decodeURIComponent(shoppingParam))
        const items: ShoppingItem[] = parsedShopping.map((item: string) => ({
          name: item,
          checked: false
        }))
        setShoppingList(items)
      } catch (error) {
        console.error('Erro ao parsear lista de compras:', error)
      }
    }
  }, [shoppingParam])

  const toggleItem = (index: number) => {
    setShoppingList(prev => prev.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    ))
  }

  const checkedCount = shoppingList.filter(item => item.checked).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <Link
            href="/cardapio"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Cardápio
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingCart className="w-8 h-8 text-green-600" />
            Lista de Compras
          </h1>
          <p className="text-gray-600 mt-2">
            {checkedCount} de {shoppingList.length} itens marcados
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Itens para comprar</h2>

          {shoppingList.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhum item na lista. Gere um cardápio primeiro.
            </p>
          ) : (
            <div className="space-y-3">
              {shoppingList.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    item.checked
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => toggleItem(index)}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    item.checked
                      ? 'bg-green-600 border-green-600'
                      : 'border-gray-300'
                  }`}>
                    {item.checked && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`flex-1 ${item.checked ? 'line-through text-gray-500' : ''}`}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {shoppingList.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <button
                onClick={() => setShoppingList(prev => prev.map(item => ({ ...item, checked: false })))}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
              >
                Desmarcar Todos
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  )
}