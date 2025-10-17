/**
 * ComparisonCard Component
 * Sprint 4: Content + Comparison
 *
 * Allows users to compare their MBTI type with others
 * using a unique comparison code
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Copy, Check, Heart, Briefcase, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import {
  calculateCompatibilityScore,
  getCompatibilityStrengths,
  getCompatibilityChallenges,
  getCommunicationTips,
  isValidComparisonCode,
  parseComparisonCode,
  CompatibilityResult,
} from '@/types/comparison';

interface ComparisonCardProps {
  userCode: string;
  userMbtiType: string;
  onCompare?: (otherCode: string) => void;
}

export function ComparisonCard({ userCode, userMbtiType, onCompare }: ComparisonCardProps) {
  const [compareCode, setCompareCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<CompatibilityResult | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userCode);
    setCopied(true);
    toast.success('Código copiado!', {
      description: 'Compartilhe com amigos para comparar personalidades',
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const handleCompare = () => {
    const trimmedCode = compareCode.trim().toUpperCase();

    // Validate code format
    if (!isValidComparisonCode(trimmedCode)) {
      toast.error('Código inválido', {
        description: 'Use o formato: ESTJ-A7K9M2',
      });
      return;
    }

    // Check if comparing with self
    if (trimmedCode === userCode) {
      toast.error('Você não pode comparar consigo mesmo!');
      return;
    }

    const parsed = parseComparisonCode(trimmedCode);
    if (!parsed) return;

    setIsComparing(true);

    // Simulate API call (in real app, this would fetch from backend)
    setTimeout(() => {
      const score = calculateCompatibilityScore(userMbtiType, parsed.mbtiType);
      const strengths = getCompatibilityStrengths(userMbtiType, parsed.mbtiType);
      const challenges = getCompatibilityChallenges(userMbtiType, parsed.mbtiType);
      const tips = getCommunicationTips(userMbtiType, parsed.mbtiType);

      const result: CompatibilityResult = {
        user1: {
          mbtiType: userMbtiType,
          code: userCode,
        },
        user2: {
          mbtiType: parsed.mbtiType,
          code: trimmedCode,
        },
        compatibilityScore: score,
        strengths,
        challenges,
        communicationTips: tips,
        relationshipType: 'general',
      };

      setComparisonResult(result);
      setIsComparing(false);
      onCompare?.(trimmedCode);

      toast.success('Comparação concluída!', {
        description: `${score}% de compatibilidade`,
      });
    }, 1000);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Compare com Outras Pessoas
        </CardTitle>
        <CardDescription>
          Descubra a compatibilidade entre personalidades
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* User's Code */}
        <div>
          <p className="text-sm font-semibold mb-2">Seu código de comparação:</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 p-3 rounded-lg bg-primary/10 border border-primary/20 font-mono font-bold text-lg">
              {userCode}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyCode}
              className="flex-shrink-0"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Compartilhe este código com amigos, parceiros ou colegas
          </p>
        </div>

        {/* Comparison Input */}
        <div>
          <p className="text-sm font-semibold mb-2">Insira o código de alguém:</p>
          <div className="flex items-center gap-2">
            <Input
              placeholder="ESTJ-A7K9M2"
              value={compareCode}
              onChange={(e) => setCompareCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleCompare()}
              className="font-mono"
              maxLength={11}
            />
            <Button
              onClick={handleCompare}
              disabled={!compareCode || isComparing}
              className="flex-shrink-0"
            >
              {isComparing ? 'Comparando...' : 'Comparar'}
            </Button>
          </div>
        </div>

        {/* Comparison Result */}
        {comparisonResult && (
          <div className="space-y-4 pt-4 border-t">
            <ComparisonResult result={comparisonResult} />
          </div>
        )}

        {/* Quick Tips */}
        {!comparisonResult && (
          <div className="p-4 rounded-lg bg-accent/50 space-y-2">
            <p className="text-sm font-semibold">💡 Use comparações para:</p>
            <ul className="text-xs text-muted-foreground space-y-1 pl-4">
              <li className="flex items-center gap-2">
                <Heart className="w-3 h-3" />
                Entender dinâmicas de relacionamento
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="w-3 h-3" />
                Melhorar colaboração no trabalho
              </li>
              <li className="flex items-center gap-2">
                <UserPlus className="w-3 h-3" />
                Construir amizades mais profundas
              </li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ComparisonResultProps {
  result: CompatibilityResult;
}

function ComparisonResult({ result }: ComparisonResultProps) {
  const { user1, user2, compatibilityScore, strengths, challenges, communicationTips } = result;

  // Get compatibility color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-orange-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Boa';
    if (score >= 40) return 'Moderada';
    return 'Desafiadora';
  };

  return (
    <div className="space-y-4">
      {/* Score Header */}
      <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Badge variant="default" className="text-base px-3 py-1">
            {user1.mbtiType}
          </Badge>
          <span className="text-2xl">💫</span>
          <Badge variant="default" className="text-base px-3 py-1">
            {user2.mbtiType}
          </Badge>
        </div>
        <div className={`text-4xl font-bold ${getScoreColor(compatibilityScore)}`}>
          {compatibilityScore}%
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Compatibilidade {getScoreLabel(compatibilityScore)}
        </p>
      </div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <span className="text-lg">💪</span>
            Pontos Fortes da Relação:
          </h4>
          <ul className="space-y-1">
            {strengths.map((strength, index) => (
              <li
                key={index}
                className="text-xs text-muted-foreground bg-green-50 p-2 rounded border border-green-200"
              >
                • {strength}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Challenges */}
      {challenges.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            Desafios Potenciais:
          </h4>
          <ul className="space-y-1">
            {challenges.map((challenge, index) => (
              <li
                key={index}
                className="text-xs text-muted-foreground bg-amber-50 p-2 rounded border border-amber-200"
              >
                • {challenge}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Communication Tips */}
      {communicationTips.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <span className="text-lg">💬</span>
            Dicas de Comunicação:
          </h4>
          <ul className="space-y-1">
            {communicationTips.map((tip, index) => (
              <li
                key={index}
                className="text-xs text-muted-foreground bg-blue-50 p-2 rounded border border-blue-200"
              >
                • {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
