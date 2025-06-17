
import { useState, useEffect } from "react";

export const useRevenueScrollManager = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Find the scroll container and target element
    const scrollContainer = document.getElementById('revenue-scroll-area');
    const targetElement = document.getElementById(sectionId);
    
    if (scrollContainer && targetElement) {
      // Get the scroll container's viewport
      const scrollViewport = scrollContainer.querySelector('[data-radix-scroll-area-viewport]');
      
      if (scrollViewport) {
        // Calculate position to scroll to (position the section just below the summary)
        const containerRect = scrollViewport.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const scrollTop = scrollViewport.scrollTop;
        
        // Calculate the target scroll position
        // We want the section to be positioned just below the summary table
        const targetScrollTop = scrollTop + (targetRect.top - containerRect.top) - 20; // 20px offset
        
        // Smooth scroll to the target position
        scrollViewport.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: 'smooth'
        });
      }
    }
  };

  const handleItemClick = (modalName: string) => {
    console.log("Modal clicked:", modalName);
    
    // Check if it's a section navigation request
    const sectionMappings: Record<string, string> = {
      'occupancy-section': 'occupancy-section',
      'adr-section': 'adr-section', 
      'revpar-section': 'revpar-section',
      'rooms-revenue-section': 'rooms-revenue-section',
      'food-beverage-section': 'food-beverage-section',
      'other-operated-section': 'other-operated-section',
      'miscellaneous-section': 'miscellaneous-section',
      'allocated-section': 'allocated-section',
      'total-revenue-section': 'total-revenue-section',
      'rooms-expense-section': 'rooms-expense-section',
      'food-beverage-expense-section': 'food-beverage-expense-section',
      'other-operated-expense-section': 'other-operated-expense-section',
      'miscellaneous-expense-section': 'miscellaneous-expense-section',
      'allocated-expense-section': 'allocated-expense-section',
      'undistributed-expenses-section': 'undistributed-expenses-section',
      'non-operating-expenses-section': 'non-operating-expenses-section',
      'total-expense-section': 'total-expense-section'
    };
    
    if (sectionMappings[modalName]) {
      scrollToSection(sectionMappings[modalName]);
    }
  };

  // Listen for scroll events to update active section
  useEffect(() => {
    const scrollContainer = document.getElementById('revenue-scroll-area');
    if (!scrollContainer) return;

    const scrollViewport = scrollContainer.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollViewport) return;

    const handleScroll = () => {
      const sections = [
        'occupancy-section',
        'adr-section', 
        'revpar-section',
        'rooms-revenue-section',
        'food-beverage-section',
        'other-operated-section',
        'miscellaneous-section',
        'allocated-section',
        'total-revenue-section',
        'rooms-expense-section',
        'food-beverage-expense-section',
        'other-operated-expense-section',
        'miscellaneous-expense-section',
        'allocated-expense-section',
        'undistributed-expenses-section',
        'non-operating-expenses-section',
        'total-expense-section'
      ];

      let currentSection = null;
      const viewportTop = scrollViewport.scrollTop;
      const viewportHeight = scrollViewport.clientHeight;
      const midPoint = viewportTop + viewportHeight / 3; // Use top third as trigger point

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const containerRect = scrollViewport.getBoundingClientRect();
          const elementTop = viewportTop + (rect.top - containerRect.top);
          const elementBottom = elementTop + rect.height;

          if (elementTop <= midPoint && elementBottom > midPoint) {
            currentSection = sectionId;
            break;
          }
        }
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    scrollViewport.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      scrollViewport.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  return {
    activeSection,
    handleItemClick
  };
};
