import { VisibilityCapabilityPipe } from './visibility-capability.pipe';

describe('VisibilityCapabilityPipe', () => {
  it('create an instance', () => {
    const pipe: VisibilityCapabilityPipe = new VisibilityCapabilityPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the correct string for the given arguments', () => {
    const pipe: VisibilityCapabilityPipe = new VisibilityCapabilityPipe();
    const str = pipe.transform({SHOW_RESPONSE: true,
                                SHOW_GIVER_NAME: true,
                                SHOW_RECIPIENT_NAME: false});
    expect(str).toEqual('can see your response, and your name, but not the name of the recipient');
  })
});
