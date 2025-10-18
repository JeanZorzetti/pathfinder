import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isMBTICode } from '../types/personality';
import { getPersonalityType, isTypeImplemented } from '../data/mbti-types';
import { useAnalytics } from '../hooks/useAnalytics';
import MetaTags from '../components/MetaTags';
import SocialShareButtons from '../components/SocialShareButtons';
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

  // Use AuthContext to check if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Analytics hook
  const {
    trackResultView,
    trackScrollDepth,
    trackTimeOnPage,
    trackGatedContentPreview,
  } = useAnalytics();

  // Refs para tracking de scroll e tempo
  const scrollDepthsTracked = useRef<Set<number>>(new Set());
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    // Check authentication using authService
    const checkAuth = () => {
      // Import authService dynamically to avoid circular deps
      import('@/services/authService').then(({ authService }) => {
        setIsAuthenticated(authService.isAuthenticated());
      });
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Validar e carregar tipo de personalidade
    const upperType = type?.toUpperCase();

    if (!upperType || !isMBTICode(upperType)) {
      // Tipo inválido - redirecionar para NotFound
      navigate('*');
      return;
    }

    if (!isTypeImplemented(upperType)) {
      // Tipo ainda não implementado
      setIsLoading(false);
      return;
    }

    const data = getPersonalityType(upperType);

    if (!data) {
      console.error(`Failed to load personality type data for ${upperType}`);
      setIsLoading(false);
      return;
    }

    console.log('🔍 DEBUG - Full personality type data:', JSON.stringify(data, null, 2));
    console.log('🔍 DEBUG - strengths.gated type:', typeof data.strengths?.gated, Array.isArray(data.strengths?.gated));
    console.log('🔍 DEBUG - careers.gated type:', typeof data.careers?.gated, Array.isArray(data.careers?.gated));
    console.log('🔍 DEBUG - weaknesses.gated type:', typeof data.weaknesses?.gated);

    setPersonalityType(data);
    setIsLoading(false);

    // Track result view
    trackResultView(upperType, isAuthenticated);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [type, navigate, isAuthenticated, trackResultView]);

  // Track scroll depth
  useEffect(() => {
    if (!personalityType) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (
          scrollPercentage >= milestone &&
          !scrollDepthsTracked.current.has(milestone)
        ) {
          scrollDepthsTracked.current.add(milestone);
          trackScrollDepth(milestone, personalityType.code);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [personalityType, trackScrollDepth]);

  // Track time on page
  useEffect(() => {
    if (!personalityType) return;

    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);

      // Track at 30s, 60s, 120s, 300s
      if ([30, 60, 120, 300].includes(timeSpent)) {
        trackTimeOnPage(timeSpent, personalityType.code);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [personalityType, trackTimeOnPage]);

  // Track gated content previews visibility
  useEffect(() => {
    if (!personalityType || isAuthenticated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute('data-section');
            if (section) {
              trackGatedContentPreview(section, personalityType.code);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe gated content sections
    const gatedSections = document.querySelectorAll('[data-gated-section]');
    gatedSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [personalityType, isAuthenticated, trackGatedContentPreview]);

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

  // Type Not Implemented Yet or Failed to Load
  if (!personalityType) {
    const upperType = type?.toUpperCase();
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Tipo {upperType} Em Desenvolvimento
          </h1>
          <p className="text-gray-600 mb-6">
            Estamos trabalhando no conteúdo detalhado para o tipo {upperType}.
            Em breve você poderá acessar a análise completa!
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-purple-800">
              <strong>Tipos já disponíveis:</strong> Todos os 16 tipos MBTI
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

  // Safe to render - personalityType is guaranteed to exist here
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dynamic Meta Tags for SEO */}
      <MetaTags personalityType={personalityType} />

      {/* Hero Section */}
      <HeroSection type={personalityType} />

      {/* Action Buttons */}
      {isAuthenticated && (
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm border border-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar ao Dashboard
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Overview */}
        {personalityType.overview && (
          <OverviewSection overview={personalityType.overview} />
        )}

        {/* Cognitive Functions */}
        {personalityType.cognitiveFunctions && personalityType.cognitiveFunctions.length > 0 && (
          <CognitiveFunctionsStack
            functions={personalityType.cognitiveFunctions}
            colorScheme={personalityType.colorScheme}
          />
        )}

        {/* Strengths Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            💪 Suas Forças
          </h2>
          <p className="text-gray-600 mb-8">
            Estas são as características que fazem você brilhar. Use-as com consciência e intencionalidade.
          </p>
          {personalityType.strengths?.free && personalityType.strengths.free.length > 0 && (
            <StrengthsList strengths={personalityType.strengths.free} />
          )}

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
                ctaLocation="strengths"
              />
            </div>
          )}

          {/* Show Gated Strengths if Authenticated */}
          {isAuthenticated && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                ✨ Forças Secundárias
              </h3>
              <StrengthsList strengths={personalityType.strengths?.gated || []} />
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
          {personalityType.weaknesses?.free && personalityType.weaknesses.free.length > 0 && (
            <WeaknessesList
              weaknesses={personalityType.weaknesses.free}
              showMitigation={false}
            />
          )}

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
                ctaLocation="weaknesses"
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
                weaknesses={personalityType.weaknesses?.gated?.full || []}
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
          {personalityType.careers?.free && personalityType.careers.free.length > 0 && (
            <CareerPathsGrid careers={personalityType.careers.free} showDetailed={false} />
          )}

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
                ctaLocation="careers"
              />
            </div>
          )}

          {/* Show Gated Careers if Authenticated */}
          {isAuthenticated && personalityType.careers?.gated && personalityType.careers.gated.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                📊 Mais Carreiras Detalhadas
              </h3>
              <CareerPathsGrid careers={personalityType.careers.gated} showDetailed={true} />
            </div>
          )}
        </section>


        {/* Famous People */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            ✨ Pessoas Famosas {personalityType.code}
          </h2>
          <p className="text-gray-600 mb-8">
            Estas personalidades compartilham seu tipo MBTI. Veja o que vocês têm em comum!
          </p>
          <FamousPeopleGrid people={personalityType.famousPeople || []} />
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

        {/* Social Share Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center">
            🔗 Compartilhe Seu Resultado
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Mostre para seus amigos e família qual é seu tipo de personalidade!
          </p>
          <div className="flex justify-center">
            <SocialShareButtons
              personalityType={personalityType.code}
              personalityNickname={personalityType.nickname}
            />
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-col md:flex-row gap-4 justify-center">
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
