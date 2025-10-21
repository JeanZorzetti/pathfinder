import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import LikertScale, { LikertValue } from "./LikertScale";
import { LikertQuestion } from "@/data/mbti-questions-60";

interface QuestionPageProps {
  questions: LikertQuestion[];
  answers: Record<number, LikertValue>;
  onAnswerChange: (questionId: number, value: Exclude<LikertValue, null>) => void;
  className?: string;
}

const QuestionPage = ({
  questions,
  answers,
  onAnswerChange,
  className,
}: QuestionPageProps) => {
  return (
    <div className={cn("space-y-4 sm:space-y-6", className)}>
      {questions.map((question, index) => {
        const isAnswered = answers[question.id] !== null && answers[question.id] !== undefined;

        return (
          <Card
            key={question.id}
            className={cn(
              "p-4 sm:p-6 transition-all duration-200",
              isAnswered && "border-primary shadow-sm"
            )}
          >
            <div className="space-y-3 sm:space-y-4">
              {/* Question header */}
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-semibold text-primary bg-primary/10 px-2 sm:px-3 py-1 rounded-full">
                      Questão {question.id}
                    </span>
                    {isAnswered && (
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                        <span>✓</span>
                        <span className="hidden sm:inline">Respondida</span>
                      </span>
                    )}
                  </div>
                  <p className="text-base sm:text-lg font-medium leading-relaxed">
                    {question.text}
                  </p>
                </div>
              </div>

              {/* Likert scale */}
              <LikertScale
                value={answers[question.id] ?? null}
                onChange={(value) => onAnswerChange(question.id, value)}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default QuestionPage;
