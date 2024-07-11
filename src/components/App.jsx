import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section';
import { Notification } from './Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return ((feedback.good / countTotalFeedback()) * 100).toFixed(2);
  };

  const handlerAddRate = feedbackType => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section
        title="Please leave feedback"
        children={
          <FeedbackOptions
            options={Object.keys(feedback)}
            onLeaveFeedback={handlerAddRate}
          />
        }
      />
      {countTotalFeedback() > 0 ? (
        <Section
          title="Feedback statistics"
          children={
            <Statistics
              good={feedback.good}
              neutral={feedback.neutral}
              bad={feedback.bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          }
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
};
