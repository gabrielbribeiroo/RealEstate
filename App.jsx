import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Calculator, TrendingUp, Home, Building, DollarSign } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [scenarios, setScenarios] = useState({
    investment: {
      initialAmount: '',
      annualReturn: '',
      period: ''
    },
    renovateToLive: {
      propertyValue: '',
      renovationCost: '',
      monthlyCondoFee: '',
      annualIPTU: '',
      maintenanceCost: '',
      propertyAppreciation: '',
      period: ''
    },
    renovateToRent: {
      propertyValue: '',
      renovationCost: '',
      monthlyCondoFee: '',
      annualIPTU: '',
      maintenanceCost: '',
      monthlyRent: '',
      propertyAppreciation: '',
      period: ''
    },
    currentHome: {
      propertyValue: "",
      annualIPTU: "",
      maintenanceCost: "",
      renovationCost: "",
      propertyAppreciation: "",
      comparableRent: "",
      period: ""
    }
  })

  const [results, setResults] = useState(null)

  const updateScenario = (scenario, field, value) => {
    setScenarios(prev => ({
      ...prev,
      [scenario]: {
        ...prev[scenario],
        [field]: value
      }
    }))
  }

  const calculateScenarios = () => {
    const period = parseInt(scenarios.investment.period) || 10
    
    // Cenário 1: Investimento
    const initialAmount = parseFloat(scenarios.investment.initialAmount) || 100000
    const annualReturn = (parseFloat(scenarios.investment.annualReturn) || 10) / 100
    const investmentResult = initialAmount * Math.pow(1 + annualReturn, period)

    // Cenário 2: Reformar para morar
    const renovateToLiveValue = parseFloat(scenarios.renovateToLive.propertyValue) || 300000
    const renovationCost = parseFloat(scenarios.renovateToLive.renovationCost) || 50000
    const monthlyCondoFee = parseFloat(scenarios.renovateToLive.monthlyCondoFee) || 500
    const annualIPTU = parseFloat(scenarios.renovateToLive.annualIPTU) || 3000
    const maintenanceCost = parseFloat(scenarios.renovateToLive.maintenanceCost) || 2000
    const propertyAppreciation = (parseFloat(scenarios.renovateToLive.propertyAppreciation) || 5) / 100
    
    const totalInitialCost = renovationCost
    const annualCosts = (monthlyCondoFee * 12) + annualIPTU + maintenanceCost
    const totalCosts = totalInitialCost + (annualCosts * period)
    const futurePropertyValue = renovateToLiveValue * Math.pow(1 + propertyAppreciation, period)
    const renovateToLiveResult = futurePropertyValue - totalCosts

    // Cenário 3: Reformar para alugar
    const monthlyRent = parseFloat(scenarios.renovateToRent.monthlyRent) || 2000
    const totalRentIncome = monthlyRent * 12 * period
    const renovateToRentResult = futurePropertyValue + totalRentIncome - totalCosts

    // Cenário 4: Continuar na casa atual
    const currentHomeValue = parseFloat(scenarios.currentHome.propertyValue) || 400000
    const currentHomeIPTU = parseFloat(scenarios.currentHome.annualIPTU) || 2000
    const currentHomeMaintenance = parseFloat(scenarios.currentHome.maintenanceCost) || 3000
    const currentHomeRenovationCost = parseFloat(scenarios.currentHome.renovationCost) || 0
    const currentHomeAppreciation = (parseFloat(scenarios.currentHome.propertyAppreciation) || 4) / 100
    const comparableRent = parseFloat(scenarios.currentHome.comparableRent) || 2500
    
    const currentHomeAnnualCosts = currentHomeIPTU + currentHomeMaintenance
    const currentHomeTotalCosts = currentHomeAnnualCosts * period + currentHomeRenovationCost
    const currentHomeFutureValue = currentHomeValue * Math.pow(1 + currentHomeAppreciation, period)
    const opportunityCost = comparableRent * 12 * period // Aluguel que poderia receber
    const currentHomeResult = currentHomeFutureValue + opportunityCost - currentHomeTotalCosts

    setResults({
      investment: {
        name: 'Dinheiro Investido',
        totalReturn: investmentResult,
        totalCost: initialAmount,
        netReturn: investmentResult - initialAmount,
        roi: ((investmentResult - initialAmount) / initialAmount) * 100
      },
      renovateToLive: {
        name: 'Reformar para Morar',
        totalReturn: futurePropertyValue,
        totalCost: totalCosts,
        netReturn: renovateToLiveResult,
        roi: (renovateToLiveResult / totalInitialCost) * 100
      },
      renovateToRent: {
        name: 'Reformar para Alugar',
        totalReturn: futurePropertyValue + totalRentIncome,
        totalCost: totalCosts,
        netReturn: renovateToRentResult,
        roi: (renovateToRentResult / totalInitialCost) * 100
      },
      currentHome: {
        name: 'Continuar na Casa Atual',
        totalReturn: currentHomeFutureValue + opportunityCost,
        totalCost: currentHomeTotalCosts,
        netReturn: currentHomeResult,
        roi: (currentHomeResult / currentHomeValue) * 100
      }
    })
    setActiveTab('results')
  }

  const chartData = results ? [
    { name: 'Investimento', value: results.investment.netReturn },
    { name: 'Reformar p/ Morar', value: results.renovateToLive.netReturn },
    { name: 'Reformar p/ Alugar', value: results.renovateToRent.netReturn },
    { name: 'Casa Atual', value: results.currentHome.netReturn }
  ] : []

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Calculator className="h-8 w-8 text-blue-600" />
            Comparador de Investimentos Imobiliários
          </h1>
          <p className="text-gray-600 text-lg">
            Compare diferentes cenários e tome a melhor decisão financeira
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Início
            </TabsTrigger>
            <TabsTrigger value="investment" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Investimento
            </TabsTrigger>
            <TabsTrigger value="renovate" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Reformar
            </TabsTrigger>
            <TabsTrigger value="current" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Casa Atual
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Resultados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Bem-vindo!</CardTitle>
                <CardDescription className="text-lg">
                  Este comparador ajuda você a analisar diferentes cenários de investimento imobiliário
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-blue-600 mb-2">💰 Dinheiro Investido</h3>
                    <p className="text-sm text-gray-600">Calcule o retorno de manter seu dinheiro em investimentos financeiros</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-green-600 mb-2">🏠 Reformar para Morar</h3>
                    <p className="text-sm text-gray-600">Analise os custos e benefícios de reformar um apartamento para morar</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-purple-600 mb-2">🏢 Reformar para Alugar</h3>
                    <p className="text-sm text-gray-600">Calcule o retorno de reformar um apartamento para alugar</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-orange-600 mb-2">🏡 Continuar na Casa Atual</h3>
                    <p className="text-sm text-gray-600">Avalie os custos e benefícios de permanecer onde está</p>
                  </div>
                </div>
                <div className="text-center">
                  <Button onClick={() => setActiveTab('investment')} size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Começar Comparação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Cenário: Dinheiro Investido
                </CardTitle>
                <CardDescription>
                  Insira os dados do seu investimento financeiro
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="initialAmount">Valor Inicial (R$)</Label>
                    <Input
                      id="initialAmount"
                      type="number"
                      placeholder="100000"
                      value={scenarios.investment.initialAmount}
                      onChange={(e) => updateScenario('investment', 'initialAmount', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="annualReturn">Retorno Anual (%)</Label>
                    <Input
                      id="annualReturn"
                      type="number"
                      placeholder="10"
                      value={scenarios.investment.annualReturn}
                      onChange={(e) => updateScenario('investment', 'annualReturn', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="period">Período (anos)</Label>
                    <Input
                      id="period"
                      type="number"
                      placeholder="10"
                      value={scenarios.investment.period}
                      onChange={(e) => updateScenario('investment', 'period', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setActiveTab('renovate')} variant="outline">
                    Próximo: Reformar
                  </Button>
                  <Button onClick={calculateScenarios} className="bg-green-600 hover:bg-green-700">
                    Calcular Todos os Cenários
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="renovate">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-green-600" />
                    Cenário: Reformar para Morar
                  </CardTitle>
                  <CardDescription>
                    Dados para reformar o apartamento e morar nele
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="propertyValue">Valor do Imóvel (R$)</Label>
                      <Input
                        id="propertyValue"
                        type="number"
                        placeholder="300000"
                        value={scenarios.renovateToLive.propertyValue}
                        onChange={(e) => updateScenario('renovateToLive', 'propertyValue', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="renovationCost">Custo da Reforma (R$)</Label>
                      <Input
                        id="renovationCost"
                        type="number"
                        placeholder="50000"
                        value={scenarios.renovateToLive.renovationCost}
                        onChange={(e) => updateScenario('renovateToLive', 'renovationCost', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyCondoFee">Condomínio Mensal (R$)</Label>
                      <Input
                        id="monthlyCondoFee"
                        type="number"
                        placeholder="500"
                        value={scenarios.renovateToLive.monthlyCondoFee}
                        onChange={(e) => updateScenario('renovateToLive', 'monthlyCondoFee', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="annualIPTU">IPTU Anual (R$)</Label>
                      <Input
                        id="annualIPTU"
                        type="number"
                        placeholder="3000"
                        value={scenarios.renovateToLive.annualIPTU}
                        onChange={(e) => updateScenario('renovateToLive', 'annualIPTU', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maintenanceCost">Manutenção Anual (R$)</Label>
                      <Input
                        id="maintenanceCost"
                        type="number"
                        placeholder="2000"
                        value={scenarios.renovateToLive.maintenanceCost}
                        onChange={(e) => updateScenario('renovateToLive', 'maintenanceCost', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="propertyAppreciation">Valorização Anual (%)</Label>
                      <Input
                        id="propertyAppreciation"
                        type="number"
                        placeholder="5"
                        value={scenarios.renovateToLive.propertyAppreciation}
                        onChange={(e) => updateScenario('renovateToLive', 'propertyAppreciation', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-purple-600" />
                    Cenário: Reformar para Alugar
                  </CardTitle>
                  <CardDescription>
                    Dados para reformar o apartamento e alugá-lo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="monthlyRent">Aluguel Mensal (R$)</Label>
                      <Input
                        id="monthlyRent"
                        type="number"
                        placeholder="2000"
                        value={scenarios.renovateToRent.monthlyRent}
                        onChange={(e) => updateScenario('renovateToRent', 'monthlyRent', e.target.value)}
                      />
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <p>Os demais dados serão copiados do cenário "Reformar para Morar"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button onClick={() => setActiveTab('current')} variant="outline">
                  Próximo: Casa Atual
                </Button>
                <Button onClick={calculateScenarios} className="bg-green-600 hover:bg-green-700">
                  Calcular Todos os Cenários
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="current">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-orange-600" />
                  Cenário: Continuar na Casa Atual
                </CardTitle>
                <CardDescription>
                  Dados da sua casa atual
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="currentPropertyValue">Valor Atual da Casa (R$)</Label>
                    <Input
                      id="currentPropertyValue"
                      type="number"
                      placeholder="400000"
                      value={scenarios.currentHome.propertyValue}
                      onChange={(e) => updateScenario('currentHome', 'propertyValue', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentAnnualIPTU">IPTU Anual (R$)</Label>
                    <Input
                      id="currentAnnualIPTU"
                      type="number"
                      placeholder="2000"
                      value={scenarios.currentHome.annualIPTU}
                      onChange={(e) => updateScenario('currentHome', 'annualIPTU', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentMaintenanceCost">Manutenção Anual (R$)</Label>
                    <Input
                      id="currentMaintenanceCost"
                      type="number"
                      placeholder="3000"
                      value={scenarios.currentHome.maintenanceCost}
                      onChange={(e) => updateScenario("currentHome", "maintenanceCost", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentRenovationCost">Custo de Reforma (R$)</Label>
                    <Input
                      id="currentRenovationCost"
                      type="number"
                      placeholder="0"
                      value={scenarios.currentHome.renovationCost}
                      onChange={(e) => updateScenario("currentHome", "renovationCost", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentPropertyAppreciation">Valorização Anual (%)</Label>
                    <Input
                      id="currentPropertyAppreciation"
                      type="number"
                      placeholder="4"
                      value={scenarios.currentHome.propertyAppreciation}
                      onChange={(e) => updateScenario('currentHome', 'propertyAppreciation', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="comparableRent">Aluguel Comparável (R$/mês)</Label>
                    <Input
                      id="comparableRent"
                      type="number"
                      placeholder="2500"
                      value={scenarios.currentHome.comparableRent}
                      onChange={(e) => updateScenario('currentHome', 'comparableRent', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={calculateScenarios} className="bg-green-600 hover:bg-green-700">
                    Calcular Todos os Cenários
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            {results ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Resultados da Comparação
                    </CardTitle>
                    <CardDescription>
                      Análise comparativa dos cenários de investimento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Retorno Líquido por Cenário</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Retorno Líquido']} />
                            <Bar dataKey="value" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Distribuição dos Retornos</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={chartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Retorno Líquido']} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.values(results).map((result, index) => (
                    <Card key={index} className="border-l-4" style={{borderLeftColor: COLORS[index]}}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{result.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600">Retorno Total</p>
                          <p className="text-lg font-semibold text-green-600">
                            R$ {result.totalReturn.toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Custo Total</p>
                          <p className="text-lg font-semibold text-red-600">
                            R$ {result.totalCost.toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Retorno Líquido</p>
                          <p className={`text-lg font-semibold ${result.netReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            R$ {result.netReturn.toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">ROI</p>
                          <p className={`text-lg font-semibold ${result.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {result.roi.toFixed(1)}%
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recomendações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(() => {
                        const bestScenario = Object.values(results).reduce((best, current) => 
                          current.netReturn > best.netReturn ? current : best
                        )
                        const worstScenario = Object.values(results).reduce((worst, current) => 
                          current.netReturn < worst.netReturn ? current : worst
                        )
                        
                        return (
                          <>
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                              <h4 className="font-semibold text-green-800 mb-2">✅ Melhor Opção</h4>
                              <p className="text-green-700">
                                <strong>{bestScenario.name}</strong> apresenta o melhor retorno líquido de 
                                <strong> R$ {bestScenario.netReturn.toLocaleString('pt-BR')}</strong> com ROI de 
                                <strong> {bestScenario.roi.toFixed(1)}%</strong>.
                              </p>
                            </div>
                            
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                              <h4 className="font-semibold text-red-800 mb-2">❌ Pior Opção</h4>
                              <p className="text-red-700">
                                <strong>{worstScenario.name}</strong> apresenta o menor retorno líquido de 
                                <strong> R$ {worstScenario.netReturn.toLocaleString('pt-BR')}</strong> com ROI de 
                                <strong> {worstScenario.roi.toFixed(1)}%</strong>.
                              </p>
                            </div>
                            
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <h4 className="font-semibold text-blue-800 mb-2">💡 Considerações Importantes</h4>
                              <ul className="text-blue-700 space-y-1">
                                <li>• Estes cálculos são estimativas baseadas nos dados fornecidos</li>
                                <li>• Considere fatores como liquidez, risco e preferências pessoais</li>
                                <li>• Taxas de inflação e impostos podem afetar os resultados reais</li>
                                <li>• Recomenda-se consultar um consultor financeiro para decisões importantes</li>
                              </ul>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button onClick={() => setActiveTab('home')} variant="outline" size="lg">
                    Nova Comparação
                  </Button>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum cálculo realizado</h3>
                  <p className="text-gray-500 mb-4">Preencha os dados nos cenários e clique em "Calcular" para ver os resultados</p>
                  <Button onClick={() => setActiveTab('investment')}>
                    Começar Preenchimento
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

