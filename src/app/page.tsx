import { useState } from 'react'
import Link from 'next/link'
import { Camera, Upload, ChefHat, ShoppingCart } from 'lucide-react'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [analyzing, setAnalyzing] = useState(false)
  const [ingredients, setIngredients] = useState<string[]>([])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return

    setAnalyzing(true)
    try {
      // Simular análise - em produção, usar analyzeImage tool
      // Para MVP, vamos simular com alimentos comuns
      const mockIngredients = ['tomate', 'cebola', 'alface', 'ovo', 'arroz', 'feijão']
      setIngredients(mockIngredients)
    } catch (error) {
      console.error('Erro ao analisar imagem:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <ChefHat className="w-10 h-10 text-green-600" />
            Meal Planner
          </h1>
          <p className="text-lg text-gray-600">
            Organize suas refeições com facilidade
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Fotografe seus alimentos</h2>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors flex flex-col items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-gray-600">Clique para fazer upload</span>
                <span className="text-sm text-gray-500">ou arraste uma imagem</span>
              </label>
            </div>

            {imageUrl && (
              <div className="flex-1">
                <img
                  src={imageUrl}
                  alt="Alimentos selecionados"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {selectedImage && (
            <button
              onClick={analyzeImage}
              disabled={analyzing}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              {analyzing ? 'Analisando...' : 'Analisar Imagem'}
            </button>
          )}
        </div>

        {ingredients.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Alimentos identificados:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>

            <Link
              href={`/cardapio?ingredients=${encodeURIComponent(JSON.stringify(ingredients))}`}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <ChefHat className="w-5 h-5" />
              Gerar Cardápio Semanal
            </Link>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/cardapio"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <ChefHat className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="text-lg font-semibold mb-2">Ver Cardápio</h3>
            <p className="text-gray-600">Veja seu planejamento semanal</p>
          </Link>

          <Link
            href="/lista"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <ShoppingCart className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="text-lg font-semibold mb-2">Lista de Compras</h3>
            <p className="text-gray-600">Organize suas compras</p>
          </Link>
        </div>
      </div>
    </div>
  )
}