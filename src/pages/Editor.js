import ReactQuill from "react-quill";

export default function Editor({value,onChange}) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],                                  // Opções para cabeçalhos
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],     // Opções para formatação de texto
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],                     // Opções para listas
      ['link', 'image'],    // Opções para adicionar links e imagens
      ['clean'],           // Opção para remover a formatação
    ],
  };
  return (
    <div className="content">
    <ReactQuill
      value={value}
      theme={'snow'}
      onChange={onChange}
      modules={modules} />
    </div>
  );
}