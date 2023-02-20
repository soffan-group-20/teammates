import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InstructorSessionResultSectionType } from '../../../../../web/app/pages-instructor/instructor-session-result-page/instructor-session-result-section-type.enum';
import { QuestionOutput } from 'src/web/types/api-output';
import { FeedbackQuestionType } from '../../../../../web/types/api-request';
import { ResponseModerationButtonModule } from '../../../pages-instructor/instructor-session-result-page/response-moderation-button/response-moderation-button.module';
import { PanelChevronModule } from '../../panel-chevron/panel-chevron.module';
import { QuestionTextWithInfoModule } from '../../question-text-with-info/question-text-with-info.module';
import { TeammatesCommonModule } from '../../teammates-common/teammates-common.module';
import { PerQuestionViewResponsesModule } from '../per-question-view-responses/per-question-view-responses.module';
import { SingleStatisticsModule } from '../single-statistics/single-statistics.module';
import { GqrRqgViewResponsesComponent } from './gqr-rqg-view-responses.component';

describe('GqrRqgViewResponsesComponent', () => {
  let component: GqrRqgViewResponsesComponent;
  let fixture: ComponentFixture<GqrRqgViewResponsesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GqrRqgViewResponsesComponent],
      imports: [
        QuestionTextWithInfoModule,
        PerQuestionViewResponsesModule,
        ResponseModerationButtonModule,
        SingleStatisticsModule,
        TeammatesCommonModule,
        HttpClientTestingModule,
        NgbModule,
        PanelChevronModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GqrRqgViewResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('trivial filter', () => {
    component.indicateMissingResponses = true;
    component.sectionOfView = '';
    component.section = '';
    component.isGqr = false;

    // Fake response data
    component.responses = [
      {
        feedbackQuestion: {
          questionType: FeedbackQuestionType.TEXT,
        },
        allResponses: [
          {
            isMissingResponse: false,
            giverEmail: 'test@test.com',
            giver: 'test',
          },
        ],
      } as unknown as QuestionOutput,
    ];
    component.ngOnInit();
    expect(component.userToEmail['test']).toEqual('test@test.com');
  });

  it('tests filterUserExpandedRespones', () => {
    component.indicateMissingResponses = true;
    component.sectionOfView = '';
    component.section = 'testSection';
    component.isGqr = false;
    component.sectionType = InstructorSessionResultSectionType.EITHER;

    // Fake response data
    component.userExpanded = {
      testUserA: true,
    };

    component.responses = [
      {
        allResponses: [
          {
            recipient: 'testUserA',
            giverSection: 'testSection',
          },
        ],
      } as QuestionOutput,
    ];

    component.filterUserExpandedRespones();

    expect(Object.keys(component.responsesToShow).length).toEqual(1);
    expect(component.responsesToShow['testUserA']).toBeDefined();
    expect(
      component.responsesToShow['testUserA'][0].questionOutput.allResponses[0]
        .recipient
    ).toEqual('testUserA');
    expect(
      component.responsesToShow['testUserA'][0].questionOutput.allResponses[0]
        .giverSection
    ).toEqual('testSection');
  });
});
