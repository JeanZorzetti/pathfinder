import { ReactNode } from "react";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { PullToRefreshIndicator } from "./PullToRefreshIndicator";
import { haptics } from "@/utils/haptics";

interface MobileEnhancedWrapperProps {
  children: ReactNode;
  onRefresh: () => Promise<void> | void;
  enablePullToRefresh?: boolean;
}

export const MobileEnhancedWrapper = ({
  children,
  onRefresh,
  enablePullToRefresh = true,
}: MobileEnhancedWrapperProps) => {
  const handleRefresh = async () => {
    haptics.selection(); // Haptic feedback when refresh starts
    await onRefresh();
    haptics.success(); // Haptic feedback when refresh completes
  };

  const { pullY, isRefreshing, shouldTrigger } = usePullToRefresh({
    onRefresh: handleRefresh,
  });

  return (
    <>
      {enablePullToRefresh && (
        <PullToRefreshIndicator
          pullY={pullY}
          isRefreshing={isRefreshing}
          shouldTrigger={shouldTrigger}
        />
      )}
      {children}
    </>
  );
};
