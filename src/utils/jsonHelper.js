export const exportToJson = (data) => {
    //kiểm tra nếu data là một object hoặc array
    if (!data.name) return alert("Vui lòng nhập tên của quiz ");

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.name.replace(/\s+/g, "_")}.json`;
    link.click();
    URL.revokeObjectURL(url);
};
export const importFromJson = (file, setQuiz) => {
    return new Promise((resolve, reject) =>{
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);
                resolve(jsonData);
            } catch (error) {
                reject(new Error("Định giạng file không hợp lệ"));
            }
        };
        reader.readAsText(file);
    });
}