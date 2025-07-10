document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".containner input");
    const button = document.getElementById("btn");

    const list = document.createElement("ul");
    list.className = "todo-list";
    document.body.appendChild(list);

    // حفظ المهام مع حالة الإنجاز
    function saveTasks() {
      const tasks = [];
      list.querySelectorAll("li").forEach(li => {
        tasks.push({
          text: li.firstChild.textContent,
          done: li.classList.contains("done")
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // إضافة مهمة مع زر الحذف وحدث الضغط لتبديل الإنجاز
    function addTask(taskObj) {
      const listItem = document.createElement("li");
      listItem.textContent = taskObj.text;
      if (taskObj.done) listItem.classList.add("done");

      // عند الضغط على النص: toggle خط الإنجاز
      listItem.addEventListener("click", (e) => {
        // نتأكد ما تضغط على زر الحذف
        if (e.target.classList.contains("delete-btn")) return;

        listItem.classList.toggle("done");
        saveTasks();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "×";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => {
        listItem.remove();
        saveTasks();
      };

      listItem.appendChild(deleteBtn);
      list.appendChild(listItem);
    }

    // تحميل المهام من التخزين
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    savedTasks.forEach(task => addTask(task));

    button.addEventListener("click", () => {
      const taskText = input.value.trim();
      if (taskText !== "") {
        addTask({text: taskText, done: false});
        saveTasks();
        input.value = "";
      }
    });
  });ة