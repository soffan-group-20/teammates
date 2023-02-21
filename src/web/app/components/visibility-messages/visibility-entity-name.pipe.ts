import { Pipe, PipeTransform } from '@angular/core';
import {
  FeedbackParticipantType,
  FeedbackVisibilityType,
  NumberOfEntitiesToGiveFeedbackToSetting,
} from '../../../types/api-output';

/**
 * Pipe to handle the display of {@code FeedbackVisibilityType} in visibility message.
 */
@Pipe({
  name: 'visibilityEntityName',
})
export class VisibilityEntityNamePipe implements PipeTransform {

  /**
   * Transform the {@code FeedbackVisibilityType} to a name.
   *
   * @param visibilityType type to transform
   * @param questionRecipientType if the visibility is {@link FeedbackVisibilityType.RECIPIENT},
   * the param should be provided in order to know the real recipient
   * @param numberOfEntitiesToGiveFeedbackToSetting used to determines the plural form of the name
   * @param customNumberOfEntitiesToGiveFeedbackTo used to determines the plural form of the name
   */
  transform(visibilityType: FeedbackVisibilityType,
            questionRecipientType?: FeedbackParticipantType,
            numberOfEntitiesToGiveFeedbackToSetting?: NumberOfEntitiesToGiveFeedbackToSetting,
            customNumberOfEntitiesToGiveFeedbackTo?: number): string {
    switch (visibilityType) {
      case FeedbackVisibilityType.RECIPIENT: {
        if (questionRecipientType === undefined)
          return 'unknown';
        // get entity name
        let recipientEntityName: string = this.getEntityName(questionRecipientType);
        
        let plural: boolean = this.isPlural(questionRecipientType,  
          numberOfEntitiesToGiveFeedbackToSetting,
          customNumberOfEntitiesToGiveFeedbackTo);
        if (plural)
          recipientEntityName = `${recipientEntityName}s`;

        return `The receiving ${recipientEntityName}`;
      }
      case FeedbackVisibilityType.GIVER_TEAM_MEMBERS:
        return 'Your team members';
      case FeedbackVisibilityType.INSTRUCTORS:
        return 'Instructors in this course';
      case FeedbackVisibilityType.STUDENTS:
        return 'Other students in the course';
      case FeedbackVisibilityType.RECIPIENT_TEAM_MEMBERS:
        return "The recipient's team members";
      default:
        return 'Unknown';
    }
  }
  
  /**
   * Converts a {@code FeedbackParticipantType} to string representation.
   * 
   * @param questionRecipientType
   */
  getEntityName(questionRecipientType: FeedbackParticipantType): string {
    if (FeedbackParticipantType.INSTRUCTORS === questionRecipientType) {
      return 'instructor';
    }
    else if ([FeedbackParticipantType.STUDENTS,
        FeedbackParticipantType.STUDENTS_EXCLUDING_SELF,
        FeedbackParticipantType.STUDENTS_IN_SAME_SECTION,
        FeedbackParticipantType.OWN_TEAM_MEMBERS,
        FeedbackParticipantType.OWN_TEAM_MEMBERS_INCLUDING_SELF]
        .includes(questionRecipientType)) {
      return 'student'
    }
    else if ([FeedbackParticipantType.TEAMS,
        FeedbackParticipantType.TEAMS_EXCLUDING_SELF,
        FeedbackParticipantType.TEAMS_IN_SAME_SECTION,
        FeedbackParticipantType.OWN_TEAM]
        .includes(questionRecipientType)) {
      return 'team'
    }
    return '';
  }

  /**
   * Checks if a recipient is plural for grammar purposes.
   * 
   * @param questionRecipientType 
   * @param numberOfEntitiesToGiveFeedbackToSetting 
   * @param customNumberOfEntitiesToGiveFeedbackTo 
   * @returns true if plural, false if not
   */
  isPlural(questionRecipientType: FeedbackParticipantType,  
           numberOfEntitiesToGiveFeedbackToSetting?: NumberOfEntitiesToGiveFeedbackToSetting,
           customNumberOfEntitiesToGiveFeedbackTo?: number): boolean {
    if ([FeedbackParticipantType.INSTRUCTORS, FeedbackParticipantType.STUDENTS,
      FeedbackParticipantType.STUDENTS_EXCLUDING_SELF, FeedbackParticipantType.TEAMS,
      FeedbackParticipantType.TEAMS_EXCLUDING_SELF]
        .includes(questionRecipientType)) {
      // if questionRecipientType is one of certain participant type, add the plural form
      if (numberOfEntitiesToGiveFeedbackToSetting === NumberOfEntitiesToGiveFeedbackToSetting.UNLIMITED
          || (numberOfEntitiesToGiveFeedbackToSetting === NumberOfEntitiesToGiveFeedbackToSetting.CUSTOM
              && customNumberOfEntitiesToGiveFeedbackTo !== undefined
              && customNumberOfEntitiesToGiveFeedbackTo > 1)) {
        return true;
      }
    }
    return false;
  }
}
