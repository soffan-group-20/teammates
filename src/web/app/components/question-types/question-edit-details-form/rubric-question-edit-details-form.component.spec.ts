import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { RubricQuestionEditDetailsFormComponent } from './rubric-question-edit-details-form.component';

describe('RubricQuestionEditDetailsFormComponent', () => {
  let component: RubricQuestionEditDetailsFormComponent;
  let fixture: ComponentFixture<RubricQuestionEditDetailsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [RubricQuestionEditDetailsFormComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricQuestionEditDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should addNewSubQuestion', () => {
    const mock = jest.fn(function (arg: Partial<typeof component.model>) {
      const { rubricSubQuestions, rubricDescriptions, rubricWeightsForEachCell } = arg;

      expect(rubricSubQuestions).toBeTruthy();
      expect(rubricSubQuestions?.length).toBe(1);
      expect(rubricSubQuestions?.[0]).toBe('');

      expect(rubricDescriptions).toBeTruthy();
      expect(rubricDescriptions?.length).toBe(1);
      expect(rubricDescriptions?.[0].length).toBe(0);

      expect(rubricWeightsForEachCell).toBeTruthy();
      expect(rubricWeightsForEachCell?.length).toBe(0);

      console.log(rubricSubQuestions, rubricDescriptions, rubricWeightsForEachCell);
    });

    component.triggerModelChangeBatch = mock;
    component.addNewSubQuestion();

    expect(mock).toHaveBeenCalled();
  });
});
