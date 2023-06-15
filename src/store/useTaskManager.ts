import create from 'zustand';


// Création du store Zustand pour gérer les tâches
const useTaskStore = create((set) => ({
  tasks: [],

  // Recherche d'une tâche par titre
  searchTask: (title: string) => {
    set((state: { tasks: any[]; }) => ({
      tasks: state.tasks.filter((task: { title: string; }) =>
        task.title.toLowerCase().includes(title.toLowerCase())
      ),
    }));
  },

  // Ajout d'une nouvelle tâche
  addTask: (newTask: any) => {
    set((state: { tasks: any; }) => ({
      tasks: [...state.tasks, newTask],
    }));
  },

  // Mise à jour des détails d'une tâche existante par titre
  updateTask: (title: any, updatedTask: any) => {
    set((state: { tasks: any[]; }) => ({
      tasks: state.tasks.map((task: { title: any; }) =>
        task.title === title ? { ...task, ...updatedTask } : task
      ),
    }));
  },

  // Suppression d'une tâche par titre
  deleteTask: (title: any) => {
    set((state: { tasks: any[]; }) => ({
      tasks: state.tasks.filter((task: { title: any; }) => task.title !== title),
    }));
  },
}));

export default useTaskStore;
