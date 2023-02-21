import { VisibilityEntityNamePipe } from './visibility-entity-name.pipe';
import {
  FeedbackVisibilityType,
} from '../../../types/api-output';

describe('VisibilityEntityNamePipe', () => {
  it('create an instance', () => {
    const pipe: VisibilityEntityNamePipe = new VisibilityEntityNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return instructor when given the appropriate enum', () => {
    const pipe: VisibilityEntityNamePipe = new VisibilityEntityNamePipe();
    const str = pipe.transform(FeedbackVisibilityType.RECIPIENT_TEAM_MEMBERS,);
    expect(str).toEqual("The recipient's team members");
  });
});
