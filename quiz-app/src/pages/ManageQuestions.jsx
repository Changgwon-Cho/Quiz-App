
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function ManageQuestions() { // <-- Abre la función ManageQuestions
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editForm, setEditForm] = useState({
    question: '',
    choices: ['', '', '', ''],
    correct: '',
  });

  // 👇 Todas tus funciones y hooks DEBEN IR DENTRO de esta función ManageQuestions
  const handleEdit = (q) => {
    setEditingQuestion(q.id);
    setEditForm({
      question: q.question,
      choices: [...q.choices],
      correct: q.correct,
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this question?');
    if (!confirmDelete) return;

    const updated = questions.filter((q) => q.id !== id);
    localStorage.setItem('questions', JSON.stringify(updated));
    setQuestions(updated);
  };

  // Cargar las preguntas desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('questions');
    if (stored) {
      setQuestions(JSON.parse(stored));
    }
  }, []);

  // 👇 El 'return' con el JSX que renderiza el componente
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-6">Questions list</h2>
        {/* Formulario para agregar una nueva pregunta */}
        <div className="bg-white p-6 rounded shadow mb-8 max-w-2xl">
          <h3 className="text-lg font-semibold mb-4">Add a new question</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const formData = new FormData(e.target);
              const question = formData.get('question');
              const options = [
                formData.get('opt1'),
                formData.get('opt2'),
                formData.get('opt3'),
                formData.get('opt4'),
              ];
              const correct = formData.get('correct');

              if (!question || options.some((opt) => !opt) || !correct) {
                alert('Please complete all fields.');
                return;
              }

              const newQuestion = {
                id: Date.now(),
                question,
                choices: options,
                correct,
              };

              const updatedQuestions = [...questions, newQuestion];
              localStorage.setItem('questions', JSON.stringify(updatedQuestions));
              setQuestions(updatedQuestions);
              e.target.reset();
            }}
            className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Question</label>
              <input name="question" className="w-full border px-3 py-2 rounded" />
            </div>

            {[1, 2, 3, 4].map((n) => (
              <div key={n}>
                <label className="block mb-1 font-medium">Option {n}</label>
                <input name={`opt${n}`} className="w-full border px-3 py-2 rounded" />
              </div>
            ))}

            <div>
              <label className="block mb-1 font-medium">Correct option</label>
              <select name="correct" className="w-full border px-3 py-2 rounded">
                <option value="">Select the correct answer</option>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={`opt${n}`}>
                    Option {n}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Save the question
            </button>
          </form>
          {editingQuestion && (
          <div className="bg-yellow-100 p-6 rounded shadow mb-8 max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Edit question</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updated = questions.map((q) =>
                  q.id === editingQuestion
                    ? {
                        ...q,
                        question: editForm.question,
                        choices: editForm.choices,
                        correct: editForm.correct,
                      }
                    : q
                );
                localStorage.setItem('questions', JSON.stringify(updated));
                setQuestions(updated);
                setEditingQuestion(null);
                setEditForm({
                  question: '',
                  choices: ['', '', '', ''],
                  correct: '',
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block mb-1 font-medium">Question</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={editForm.question}
                  onChange={(e) =>
                    setEditForm({ ...editForm, question: e.target.value })
                  }
                />
              </div>

              {editForm.choices.map((choice, i) => (
                <div key={i}>
                  <label className="block mb-1 font-medium">Option {i + 1}</label>
                  <input
                    className="w-full border px-3 py-2 rounded"
                    value={choice}
                    onChange={(e) => {
                      const newChoices = [...editForm.choices];
                      newChoices[i] = e.target.value;
                      setEditForm({ ...editForm, choices: newChoices });
                    }}
                  />
                </div>
              ))}

              <div>
                <label className="block mb-1 font-medium">Correct option</label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={editForm.correct}
                  onChange={(e) =>
                    setEditForm({ ...editForm, correct: e.target.value })
                  }
                >
                  <option value="">Choose the correct option</option>
                  {editForm.choices.map((choice, i) => (
                    <option key={i} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        </div>


        {questions.length === 0 ? (
          <p>There is no questions saved.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Question</th>
                <th className="border px-4 py-2">Options</th>
                <th className="border px-4 py-2">Correct</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, index) => (
                <tr key={q.id}>
                  <td className="border px-4 py-2">{q.question}</td>
                  <td className="border px-4 py-2">
                    <ul className="list-disc list-inside">
                      {q.choices.map((choice, i) => (
                        <li key={i}>{choice}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2">{q.correct}</td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(q)}

                      className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      🗑 Deleted
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
    </div>
  );
} 