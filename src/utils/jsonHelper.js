// Các hàm hỗ trợ xuất nhập quiz dưới dạng JSON
export const exportToJson = (quiz) => {
  const dataStr = JSON.stringify(quiz, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quiz.json";
  link.click();
};
// Hàm nhập quiz từ file JSON, trả về Promise để xử lý bất đồng bộ
export const importFromJson = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(JSON.parse(e.target.result));
    reader.readAsText(file);
  });
};