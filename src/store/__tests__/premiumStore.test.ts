import { usePremiumStore } from '../premiumStore';

describe('premiumStore', () => {
  const premiumFeatures = ['ai_insights', 'advanced_analytics', 'family_circles', 'deep_journaling'];

  beforeEach(() => {
    // Reset store before each test
    usePremiumStore.setState({ isPremium: false });
  });

  describe('checkFeatureAccess', () => {
    it('should always allow access to non-premium features', () => {
      expect(usePremiumStore.getState().checkFeatureAccess('basic_feature')).toBe(true);
      expect(usePremiumStore.getState().checkFeatureAccess('another_free_feature')).toBe(true);
    });

    it('should deny access to premium features when isPremium is false', () => {
      expect(usePremiumStore.getState().checkFeatureAccess('ai_insights')).toBe(false);
      expect(usePremiumStore.getState().checkFeatureAccess('advanced_analytics')).toBe(false);
    });

    it('should allow access to premium features when isPremium is true', () => {
      usePremiumStore.setState({ isPremium: true });
      expect(usePremiumStore.getState().checkFeatureAccess('ai_insights')).toBe(true);
      expect(usePremiumStore.getState().checkFeatureAccess('advanced_analytics')).toBe(true);
    });
  });

  describe('togglePremium', () => {
    it('should toggle the isPremium state', () => {
      expect(usePremiumStore.getState().isPremium).toBe(false);

      usePremiumStore.getState().togglePremium();
      expect(usePremiumStore.getState().isPremium).toBe(true);

      usePremiumStore.getState().togglePremium();
      expect(usePremiumStore.getState().isPremium).toBe(false);
    });
  });
});
