import { useCommunityStore } from './communityStore';

describe('communityStore', () => {
  beforeEach(() => {
    const initialState = useCommunityStore.getState();
    useCommunityStore.setState({ ...initialState, partners: [], isLoadingPartners: false });
  });

  describe('invitePartner', () => {
    it('should handle successful invitation', async () => {
      const email = 'test@example.com';
      const promise = useCommunityStore.getState().invitePartner(email);

      expect(useCommunityStore.getState().isLoadingPartners).toBe(true);

      const result = await promise;

      expect(result).toEqual({ success: true, message: 'Invitation sent successfully!' });
      expect(useCommunityStore.getState().isLoadingPartners).toBe(false);

      const partners = useCommunityStore.getState().partners;
      expect(partners.length).toBe(1);
      expect(partners[0].name).toBe('test');
      expect(partners[0].status).toBe('pending');
      expect(partners[0].consistencyScore).toBe(0);
    });

    it('should handle error invitation', async () => {
      const email = 'error@example.com';
      const promise = useCommunityStore.getState().invitePartner(email);

      expect(useCommunityStore.getState().isLoadingPartners).toBe(true);

      const result = await promise;

      expect(result).toEqual({ success: false, message: 'User not found or already invited.' });
      expect(useCommunityStore.getState().isLoadingPartners).toBe(false);

      const partners = useCommunityStore.getState().partners;
      expect(partners.length).toBe(0);
    });
  });
});
