import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function ManageQuestions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('questions');
    if (stored) {
      setQuestions(JSON.parse(stored));
    }
  }, []);

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
                alert('Por favor completa todos los campos.');
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
                      className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      🗑 Eliminar
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
