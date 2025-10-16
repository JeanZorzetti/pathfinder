import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isMBTICode } from '../types/personality';
import { getPersonalityType, isTypeImplemented } from '../data/mbti-types';
import HeroSection from '../components/personality-results/HeroSection';
import OverviewSection from '../components/personality-results/OverviewSection';
import CognitiveFunctionsStack from '../components/personality-results/CognitiveFunctionsStack';
import StrengthsList from '../components/personality-results/StrengthsList';
import WeaknessesList from '../components/personality-results/WeaknessesList';
import CareerPathsGrid from '../components/personality-results/CareerPathsGrid';
import FamousPeopleGrid from '../components/personality-results/FamousPeopleGrid';
import GatedContentCard from '../components/personality-results/GatedContentCard';
import UnlockCTA from '../components/personality-results/UnlockCTA';

export default function PersonalityResultPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [personalityType, setPersonalityType] = useState<ReturnType<
    typeof getPersonalityType
  > | null>(null);

  // TODO: Implementar hook useAuth para verificar se usuário está logado
  // Por enquanto, simulando com localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simular verificação de autenticação
    const checkAuth = () => {
      // TODO: Integrar com Supabase
      const user = localStorage.getItem('supabase.auth.token');
      setIsAuthenticated(!!user);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Validar e carregar tipo de personalidade
    if (!type || !isMBTICode(type)) {
      // Tipo inválido
      navigate('/404');
      return;
    }

    if (!isTypeImplemented(type)) {
      // Tipo ainda não implementado
      setIsLoading(false);
      return;
    }

    const data = getPersonalityType(type);
    setPersonalityType(data);
    setIsLoading(false);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [type, navigate]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando resultado...</p>
        </div>
      </div>
    );
  }

  // Type Not Implemented Yet
  if (!personalityType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Tipo {type} Em Desenvolvimento
          </h1>
          <p className="text-gray-600 mb-6">
            Estamos trabalhando no conteúdo detalhado para o tipo {type}.
            Em breve você poderá acessar a análise completa!
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-purple-800">
              <strong>Tipos já disponíveis:</strong> INTJ, INFP
            </p>
          </div>
          <button
            onClick={() => navigate('/test/mbti')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Fazer Teste Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection type={personalityType} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Overview */}
        <OverviewSection overview={personalityType.overview} />

        {/* Cognitive Functions */}
        <CognitiveFunctionsStack
          functions={personalityType.cognitiveFunctions}
          colorScheme={personalityType.colorScheme}
        />

        {/* Strengths Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            💪 Suas Forças
          </h2>
          <p className="text-gray-600 mb-8">
            Estas são as características que fazem você brilhar. Use-as com consciência e intencionalidade.
          </p>
          <StrengthsList strengths={personalityType.strengths.free} />

          {/* Gated Strengths CTA */}
          {!isAuthenticated && (
            <div className="mt-8">
              <UnlockCTA
                title="+ 10 Forças Secundárias Bloqueadas"
                preview="Criatividade Conceitual, Auto-suficiência Emocional, Visão de Padrões Ocultos..."
                benefits={[
                  'Descubra todas as suas forças ocultas',
                  'Entenda como aplicá-las profissionalmente',
                  'Salve seus resultados permanentemente',
                ]}
              />
            </div>
          )}

          {/* Show Gated Strengths if Authenticated */}
          {isAuthenticated && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                ✨ Forças Secundárias
              </h3>
              <StrengthsList strengths={personalityType.strengths.gated} />
            </div>
          )}
        </section>

        {/* Weaknesses Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            ⚠️ Áreas de Atenção
          </h2>
          <p className="text-gray-600 mb-8">
            Conhecer suas fraquezas é o primeiro passo para superá-las. Não são defeitos, são oportunidades de crescimento.
          </p>
          <WeaknessesList
            weaknesses={personalityType.weaknesses.free}
            showMitigation={false}
          />

          {/* Gated Weaknesses CTA */}
          {!isAuthenticated && (
            <div className="mt-8">
              <UnlockCTA
                title="Análise Completa + Estratégias de Mitigação"
                preview="Aprenda a superar perfeccionismo, crítica excessiva, isolamento social..."
                benefits={[
                  'Estratégias práticas para cada fraqueza',
                  'Exercícios diários de desenvolvimento',
                  'Evite armadilhas comuns do seu tipo',
                ]}
              />
            </div>
          )}

          {/* Show Gated Weaknesses if Authenticated */}
          {isAuthenticated && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                🔧 Análise Completa + Como Superar
              </h3>
              <WeaknessesList
                weaknesses={personalityType.weaknesses.gated.full}
                showMitigation={true}
              />
            </div>
          )}
        </section>

        {/* Career Paths Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            💼 Carreiras Ideais
          </h2>
          <p className="text-gray-600 mb-8">
            Estas carreiras se alinham naturalmente com suas forças e preferências. Use como ponto de partida para exploração.
          </p>
          <CareerPathsGrid careers={personalityType.careers.free} showDetailed={false} />

          {/* Gated Careers CTA */}
          {!isAuthenticated && (
            <div className="mt-8">
              <UnlockCTA
                title="+ 20 Carreiras Detalhadas"
                preview="Professor Universitário (88%), Advogado Especializado (85%), Data Scientist (90%)..."
                benefits={[
                  'Ambiente de trabalho ideal para cada carreira',
                  'Faixa salarial e progressão de carreira',
                  'Por que cada carreira combina com você',
                ]}
              />
            </div>
          )}

          {/* Show Gated Careers if Authenticated */}
          {isAuthenticated && personalityType.careers.gated.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                📊 Mais Carreiras Detalhadas
              </h3>
              <CareerPathsGrid careers={personalityType.careers.gated} showDetailed={true} />
            </div>
          )}
        </section>

        {/* Relationships - GATED */}
        <GatedContentCard
          title="❤️ Relacionamentos e Compatibilidade"
          preview={personalityType.relationships.preview}
          isLocked={!isAuthenticated}
          content={isAuthenticated ? personalityType.relationships.content : null}
          type="relationships"
        />

        {/* Growth - GATED */}
        <GatedContentCard
          title="🌱 Crescimento Pessoal"
          preview={personalityType.growth.preview}
          isLocked={!isAuthenticated}
          content={isAuthenticated ? personalityType.growth.content : null}
          type="growth"
        />

        {/* Workplace - GATED */}
        <GatedContentCard
          title="🏢 No Ambiente de Trabalho"
          preview={personalityType.workplace.preview}
          isLocked={!isAuthenticated}
          content={isAuthenticated ? personalityType.workplace.content : null}
          type="workplace"
        />

        {/* Famous People */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            ✨ Pessoas Famosas {personalityType.code}
          </h2>
          <p className="text-gray-600 mb-8">
            Estas personalidades compartilham seu tipo MBTI. Veja o que vocês têm em comum!
          </p>
          <FamousPeopleGrid people={personalityType.famousPeople} />
        </section>

        {/* Final CTA - Big Banner */}
        {!isAuthenticated && (
          <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              🔓 Desbloqueie Sua Análise Completa
            </h2>
            <p className="text-xl md:text-2xl mb-2 opacity-90">
              100% GRATUITO
            </p>
            <p className="text-lg mb-8 opacity-80">
              Cadastre-se gratuitamente para acessar todo o conteúdo
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8 text-left max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="font-bold text-lg mb-2">Análise Completa</h3>
                <p className="text-sm opacity-90">
                  20+ carreiras, compatibilidade detalhada, crescimento pessoal
                </p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl mb-3">💾</div>
                <h3 className="font-bold text-lg mb-2">Salve Resultados</h3>
                <p className="text-sm opacity-90">
                  Acesse seus resultados a qualquer momento, em qualquer dispositivo
                </p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="font-bold text-lg mb-2">Compare Tipos</h3>
                <p className="text-sm opacity-90">
                  Explore todos os 16 tipos detalhadamente e veja compatibilidades
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/auth?redirect=' + encodeURIComponent(window.location.pathname))}
              className="bg-white text-purple-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Criar Conta Gratuita
            </button>

            <p className="mt-4 text-sm opacity-75">
              Já tem conta?{' '}
              <button
                onClick={() => navigate('/auth?redirect=' + encodeURIComponent(window.location.pathname))}
                className="underline font-bold hover:opacity-100"
              >
                Entre aqui
              </button>
            </p>

            <p className="mt-6 text-xs opacity-60">
              💎 100% gratuito • Sem cartão de crédito • Sem taxas ocultas • Acesso instantâneo
            </p>
          </section>
        )}

        {/* Action Buttons */}
        <section className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              // TODO: Implementar compartilhamento social
              alert('Compartilhamento em desenvolvimento');
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <span>🔗</span>
            <span>Compartilhar Resultado</span>
          </button>

          <button
            onClick={() => navigate('/test/mbti')}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            <span>Refazer Teste</span>
          </button>

          <button
            onClick={() => {
              // TODO: Criar página de exploração de tipos
              alert('Exploração de tipos em desenvolvimento');
            }}
            className="px-6 py-3 border-2 border-gray-800 text-gray-800 rounded-lg font-medium hover:bg-gray-800 hover:text-white transition flex items-center justify-center gap-2"
          >
            <span>📚</span>
            <span>Explorar Outros Tipos</span>
          </button>
        </section>

        {/* SEO-Friendly Footer Text */}
        <section className="text-center text-sm text-gray-500 py-8 border-t border-gray-200">
          <p>
            Resultado do teste MBTI para {personalityType.code} - {personalityType.nickname}.
            Baseado na teoria de tipos psicológicos de Carl Jung e desenvolvido por Isabel Briggs Myers e Katharine Cook Briggs.
          </p>
        </section>
      </div>
    </div>
  );
}
