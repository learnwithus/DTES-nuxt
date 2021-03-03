// Custom organization function that takes the output of '$content("learn/sections", { deep: true })'
// And orgnaized this flat array into a nested array based on the parent folder (Section) of each markdown file.
//
// This was done so the ~/content/learn folder could have a clearer and more maintainable hierarchy
export default function (flatQuestions) {
    // Used to generate question numbers for each question
    let questionCounter = 0;
    // Organize questions into their parent sections
    const learnSections = flatQuestions.reduce((acc, obj) => {
        const property = obj["dir"]; // Sort all the quetsions into their parent directories (their sections)

        acc[property] = acc[property] || {}; // Create new sub object if it doesn't already exist

        // If the slug is feedback (for end-of-section feedback) add it to the feedback key,
        // If not, it must be a question so add it to the array of questions
        if (obj.slug.startsWith("feedback")) {
            acc[property].feedback = acc[property].feedback || [];
            acc[property].feedback.push(obj);
        } else if (obj.slug.startsWith("question")) {
            acc[property].questions = acc[property].questions || [];
            obj.userRequestedAnswer = false;
            obj.userAnsweredQuestion = false;
            
            // Increment and assign question number to object
            questionCounter++;
            obj.questionNumber = questionCounter;

            acc[property].questions.push(obj);
        }

        return acc;
    }, {});

    // Convert to array
    const learnSectionsArray = Object.values(learnSections);

    return learnSectionsArray;
}