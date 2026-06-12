const clienteInput = document.querySelector("#cliente");
const telefoneInput = document.querySelector("#telefone");
const dataInput = document.querySelector("#data");
const horarioInput = document.querySelector("#horario");
const pagamentoInput = document.querySelector("#pagamento");
const statusInput = document.querySelector("#status");
const observacaoInput = document.querySelector("#observacao");

const procedimentosLista = document.querySelector("#procedimentos-lista");
const tempoTotalTexto = document.querySelector("#tempo-total");
const valorTotalTexto = document.querySelector("#valor-total");

const btnSalvar = document.querySelector("#btn-salvar");
const btnLimpar = document.querySelector("#btn-limpar");

const listaAgenda = document.querySelector("#lista-agenda");

const totalAgendamentosTexto = document.querySelector("#total-agendamentos");
const totalPrevistoTexto = document.querySelector("#total-previsto");
const totalFinanceiroTexto = document.querySelector("#total-financeiro");

const calendarioVisual = document.querySelector("#calendario-visual");
const dataCalendarioTexto = document.querySelector("#data-calendario");

const sugestoesClientes = document.querySelector("#sugestoes-clientes");

const procedimentos = [
  { nome: "Design de sobrancelha", valor: 35, duracao: 30 },
  { nome: "Design com henna", valor: 45, duracao: 45 },
  { nome: "Brow Lamination", valor: 80, duracao: 45 },
  { nome: "Lash Lifting", valor: 100, duracao: 60 },
  { nome: "Extensão de cílios", valor: 120, duracao: 120 },
  { nome: "Manutenção de cílios", valor: 80, duracao: 60 },
  { nome: "Axila", valor: 25, duracao: 15 },
  { nome: "Buço", valor: 15, duracao: 15 },
];

let clientes = JSON.parse(localStorage.getItem("rl-clientes")) || [];
let agendamentos = JSON.parse(localStorage.getItem("rl-agendamentos")) || [];
let idEditando = null;

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function salvarClientes() {
  localStorage.setItem("rl-clientes", JSON.stringify(clientes));
}

function existeConflitoDeHorario(novaData, novoInicio, novoFim, idIgnorar = null) {
  const novoInicioMin = converterHorarioParaMinutos(novoInicio);
  const novoFimMin = converterHorarioParaMinutos(novoFim);

  return agendamentos.some((agendamento) => {
    if (agendamento.id === idIgnorar) {
      return false;
    }

    if (agendamento.data !== novaData) {
      return false;
    }

    if (agendamento.status === "Cancelado") {
      return false;
    }

    const inicioExistente = converterHorarioParaMinutos(agendamento.horarioInicio);
    const fimExistente = converterHorarioParaMinutos(agendamento.horarioFim);

    return novoInicioMin < fimExistente && novoFimMin > inicioExistente;
  });
}

function salvarAgendamentos() {
  localStorage.setItem("rl-agendamentos", JSON.stringify(agendamentos));
}

function colocarDataDeHoje() {
  const hoje = new Date().toISOString().split("T")[0];

  if (!dataInput.value) {
    dataInput.value = hoje;
  }
}

function formatarTelefone(valor) {
  let numero = valor.replace(/\D/g, "");

  if (numero.length > 11) {
    numero = numero.slice(0, 11);
  }

  if (numero.length <= 2) {
    return numero;
  }

  if (numero.length <= 3) {
    return `(${numero.slice(0, 2)}) ${numero.slice(2)}`;
  }

  if (numero.length <= 7) {
    return `(${numero.slice(0, 2)}) ${numero.slice(2, 3)} ${numero.slice(3)}`;
  }

  return `(${numero.slice(0, 2)}) ${numero.slice(2, 3)} ${numero.slice(3, 7)}-${numero.slice(7)}`;
}

telefoneInput.addEventListener("input", () => {
  telefoneInput.value = formatarTelefone(telefoneInput.value);
});

clienteInput.addEventListener("input", () => {
  const texto = clienteInput.value.trim().toLowerCase();

  sugestoesClientes.innerHTML = "";

  if (texto.length < 2) {
    sugestoesClientes.style.display = "none";
    return;
  }

  const resultados = clientes.filter((cliente) => {
    return cliente.nome.toLowerCase().includes(texto);
  });

  if (resultados.length === 0) {
    sugestoesClientes.style.display = "none";
    return;
  }

  resultados.forEach((cliente) => {
    const item = document.createElement("div");
    item.classList.add("sugestao-cliente");

    item.innerHTML = `
      <strong>${cliente.nome}</strong>
      <span>${cliente.telefone}</span>
    `;

    item.addEventListener("click", () => {
      clienteInput.value = cliente.nome;
      telefoneInput.value = cliente.telefone;
      observacaoInput.value = cliente.observacao || "";

      sugestoesClientes.innerHTML = "";
      sugestoesClientes.style.display = "none";
    });

    sugestoesClientes.appendChild(item);
  });

  sugestoesClientes.style.display = "block";
});

function salvarOuAtualizarCliente(nome, telefone, observacao) {
  const clienteExistente = clientes.find((cliente) => {
    return cliente.nome.toLowerCase() === nome.toLowerCase();
  });

  if (clienteExistente) {
    clienteExistente.telefone = telefone;
    clienteExistente.observacao = observacao;
  } else {
    clientes.push({
      id: Date.now(),
      nome,
      telefone,
      observacao,
    });
  }

  salvarClientes();
}

function renderizarProcedimentos() {
  procedimentosLista.innerHTML = "";

  procedimentos.forEach((procedimento, index) => {
    const item = document.createElement("label");

    item.classList.add("procedimento-item");

    item.innerHTML = `
      <input type="checkbox" value="${index}" />
      <strong>${procedimento.nome}</strong>
      <span>${formatarMoeda(procedimento.valor)} • ${procedimento.duracao} min</span>
    `;

    const checkbox = item.querySelector("input");

    checkbox.addEventListener("change", () => {
      item.classList.toggle("ativo", checkbox.checked);
      atualizarResumoProcedimentos();
    });

    procedimentosLista.appendChild(item);
  });
}

function pegarProcedimentosSelecionados() {
  const checkboxes = document.querySelectorAll(
    ".procedimento-item input:checked",
  );
  const selecionados = [];

  checkboxes.forEach((checkbox) => {
    const index = Number(checkbox.value);
    selecionados.push(procedimentos[index]);
  });

  return selecionados;
}

function formatarTempo(minutos) {
  if (minutos < 60) {
    return `${minutos} min`;
  }

  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;

  if (minutosRestantes === 0) {
    if (horas === 1) {
      return `1 hora`;
    }

    return `${horas} horas`;
  }

  return `${horas}h ${minutosRestantes}min`;
}

function atualizarResumoProcedimentos() {
  const selecionados = pegarProcedimentosSelecionados();

  const valorTotal = selecionados.reduce((total, item) => {
    return total + item.valor;
  }, 0);

  const tempoTotal = selecionados.reduce((total, item) => {
    return total + item.duracao;
  }, 0);

  tempoTotalTexto.innerHTML = formatarTempo(tempoTotal);
  valorTotalTexto.innerHTML = formatarMoeda(valorTotal);
}

function calcularHorarioFim(horarioInicio, duracaoTotal) {
  const [hora, minuto] = horarioInicio.split(":").map(Number);

  const data = new Date();
  data.setHours(hora);
  data.setMinutes(minuto + duracaoTotal);

  const horaFim = String(data.getHours()).padStart(2, "0");
  const minutoFim = String(data.getMinutes()).padStart(2, "0");

  return `${horaFim}:${minutoFim}`;
}

function limparFormulario() {
  clienteInput.value = "";
  telefoneInput.value = "";
  horarioInput.value = "";
  pagamentoInput.value = "Pix";
  statusInput.value = "Agendado";
  observacaoInput.value = "";

  const itens = document.querySelectorAll(".procedimento-item");
  const checkboxes = document.querySelectorAll(".procedimento-item input");

  itens.forEach((item) => item.classList.remove("ativo"));
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  colocarDataDeHoje();
  atualizarResumoProcedimentos();
}

function converterHorarioParaMinutos(horario) {
  const [hora, minuto] = horario.split(":").map(Number);
  return hora * 60 + minuto;
}

function converterMinutosParaHorario(totalMinutos) {
  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;

  return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}`;
}

function empurrarAgendamentos(dataAgendamento, novoInicio, duracaoNova, idIgnorar = null) {

  let fimAtual = converterHorarioParaMinutos(novoInicio) + duracaoNova;

  const agendamentosDoDia = agendamentos
    .filter((agendamento) => {
      return (
        agendamento.data === dataAgendamento &&
        agendamento.status !== "Cancelado" &&
        agendamento.id !== idIgnorar &&
        converterHorarioParaMinutos(agendamento.horarioInicio) >=
        converterHorarioParaMinutos(novoInicio)
      );
    })

    .sort((a, b) => {
      return (
        converterHorarioParaMinutos(a.horarioInicio) -
        converterHorarioParaMinutos(b.horarioInicio)
      );
    });

  agendamentosDoDia.forEach((agendamentoEmpurrado) => {

    const index = agendamentos.findIndex((item) => {
      return item.id === agendamentoEmpurrado.id;
    });

    if (index === -1) {
      return;
    }

    const inicioAtual = converterHorarioParaMinutos(
      agendamentos[index].horarioInicio
    );

    if (inicioAtual < fimAtual) {

      const duracao = agendamentos[index].duracaoTotal;

      agendamentos[index].horarioInicio =
        converterMinutosParaHorario(fimAtual);

      agendamentos[index].horarioFim =
        converterMinutosParaHorario(fimAtual + duracao);

      fimAtual = fimAtual + duracao;

    } else {

      fimAtual = converterHorarioParaMinutos(
        agendamentos[index].horarioFim
      );

    }

  });

}

function salvarAgendamento() {
  const cliente = clienteInput.value.trim();
  const telefone = telefoneInput.value.trim();
  const data = dataInput.value;
  const horario = horarioInput.value;
  const pagamento = pagamentoInput.value;
  const status = statusInput.value;
  const observacao = observacaoInput.value.trim();

  const selecionados = pegarProcedimentosSelecionados();

  if (cliente === "" || telefone === "" || data === "" || horario === "") {
    alert("Preencha cliente, telefone, data e horário.");
    return;
  }

  if (selecionados.length === 0) {
    alert("Selecione pelo menos um procedimento.");
    return;
  }

  salvarOuAtualizarCliente(cliente, telefone, observacao);

  const valorTotal = selecionados.reduce(
    (total, item) => total + item.valor,
    0,
  );
  const duracaoTotal = selecionados.reduce(
    (total, item) => total + item.duracao,
    0,
  );
  const horarioFim = calcularHorarioFim(horario, duracaoTotal);

  if (existeConflitoDeHorario(data, horario, horarioFim, idEditando)) {
    const confirmar = confirm(
      "Já existe um agendamento nesse horário. Deseja encaixar e empurrar os próximos horários?",
    );

    if (!confirmar) {
      return;
    }

    empurrarAgendamentos(data, horario, duracaoTotal, idEditando);
  }

  const agendamentoAtualizado = {
    id: idEditando || Date.now(),
    cliente,
    telefone,
    data,
    horarioInicio: horario,
    horarioFim,
    procedimentos: selecionados,
    valorTotal,
    duracaoTotal,
    pagamento,
    status,
    observacao,
  };

  if (idEditando) {
    agendamentos = agendamentos.map((agendamento) => {
      if (agendamento.id === idEditando) {
        return agendamentoAtualizado;
      }

      return agendamento;
    });

    idEditando = null;
    btnSalvar.innerHTML = "Salvar agendamento";
  } else {
    agendamentos.push(agendamentoAtualizado);
  }

  salvarAgendamentos();
  renderizarAgenda();
  limparFormulario();
}

function marcarComoAtendido(id) {
  agendamentos = agendamentos.map((agendamento) => {
    if (agendamento.id === id) {
      return {
        ...agendamento,
        status: "Atendido",
      };
    }

    return agendamento;
  });

  salvarAgendamentos();
  renderizarAgenda();
}

function cancelarAgendamento(id) {
  agendamentos = agendamentos.map((agendamento) => {
    if (agendamento.id === id) {
      return {
        ...agendamento,
        status: "Cancelado",
      };
    }

    return agendamento;
  });

  salvarAgendamentos();
  renderizarAgenda();
}

function excluirAgendamento(id) {
  const confirmar = confirm("Tem certeza que deseja excluir este agendamento?");

  if (!confirmar) {
    return;
  }

  agendamentos = agendamentos.filter((agendamento) => agendamento.id !== id);

  salvarAgendamentos();
  renderizarAgenda();
}

function editarAgendamento(id) {
  const agendamento = agendamentos.find((item) => item.id === id);

  if (!agendamento) {
    return;
  }

  idEditando = id;

  clienteInput.value = agendamento.cliente;
  telefoneInput.value = agendamento.telefone;
  dataInput.value = agendamento.data;
  horarioInput.value = agendamento.horarioInicio;
  pagamentoInput.value = agendamento.pagamento;
  statusInput.value = agendamento.status;
  observacaoInput.value = agendamento.observacao || "";

  const checkboxes = document.querySelectorAll(".procedimento-item input");
  const itens = document.querySelectorAll(".procedimento-item");

  checkboxes.forEach((checkbox, index) => {
    const procedimentoAtual = procedimentos[index];

    const existe = agendamento.procedimentos.some((procedimento) => {
      return procedimento.nome === procedimentoAtual.nome;
    });

    checkbox.checked = existe;
    itens[index].classList.toggle("ativo", existe);
  });

  atualizarResumoProcedimentos();

  btnSalvar.innerHTML = "Salvar alterações";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function renderizarCalendarioVisual() {
  calendarioVisual.innerHTML = "";

  const dataSelecionada = dataInput.value;

  if (!dataSelecionada) {
    calendarioVisual.innerHTML = `
      <div class="vazio">
        Selecione uma data para visualizar o calendário.
      </div>
    `;
    return;
  }

  dataCalendarioTexto.innerHTML = dataSelecionada
    .split("-")
    .reverse()
    .join("/");

  const horarios = [];

  for (let hora = 8; hora <= 20; hora++) {
    horarios.push(`${String(hora).padStart(2, "0")}:00`);
  }

  const agendamentosDoDia = agendamentos.filter((agendamento) => {
    return (
      agendamento.data === dataSelecionada && agendamento.status !== "Cancelado"
    );
  });

  horarios.forEach((horario) => {
    const horarioMin = converterHorarioParaMinutos(horario);

    const agendamentoEncontrado = agendamentosDoDia.find((agendamento) => {
      const inicio = converterHorarioParaMinutos(agendamento.horarioInicio);
      const fim = converterHorarioParaMinutos(agendamento.horarioFim);

      return horarioMin >= inicio && horarioMin < fim;
    });

    const linha = document.createElement("div");
    linha.classList.add("horario-linha");

    if (agendamentoEncontrado) {
      const procedimentosTexto = agendamentoEncontrado.procedimentos
        .map((procedimento) => procedimento.nome)
        .join(" + ");

      linha.innerHTML = `
        <div class="horario">${horario}</div>

        <div class="slot ocupado">
          <strong>${agendamentoEncontrado.cliente}</strong>
          <span>${agendamentoEncontrado.horarioInicio} às ${agendamentoEncontrado.horarioFim}</span>
          <span>${procedimentosTexto}</span>
          <span>${formatarMoeda(agendamentoEncontrado.valorTotal)}</span>
        </div>
      `;
    } else {
      linha.innerHTML = `
        <div class="horario">${horario}</div>

        <div class="slot livre">
          Horário livre
        </div>
      `;
    }

    calendarioVisual.appendChild(linha);
  });
}

function renderizarAgenda() {
  listaAgenda.innerHTML = "";

  if (agendamentos.length === 0) {
    listaAgenda.innerHTML = `
      <div class="vazio">
        Nenhum agendamento cadastrado.
      </div>
    `;

    atualizarCards();
    renderizarCalendarioVisual();

    return;
  }

  const agendamentosOrdenados = [...agendamentos].sort((a, b) => {
    return (
      new Date(`${a.data}T${a.horarioInicio}`) -
      new Date(`${b.data}T${b.horarioInicio}`)
    );
  });

  agendamentosOrdenados.forEach((agendamento) => {
    const procedimentosTexto = agendamento.procedimentos
      .map((procedimento) => procedimento.nome)
      .join(" + ");

    const card = document.createElement("div");
    card.classList.add("agendamento");

    card.innerHTML = `
      <div class="agendamento-top">
        <div>
          <h3>${agendamento.cliente}</h3>
          <p>${agendamento.telefone}</p>
        </div>

        <span class="status ${agendamento.status}">
          ${agendamento.status}
        </span>
      </div>

      <p><strong>Data:</strong> ${agendamento.data}</p>
      <p><strong>Horário:</strong> ${agendamento.horarioInicio} às ${agendamento.horarioFim}</p>
      <p><strong>Procedimentos:</strong> ${procedimentosTexto}</p>
      <p><strong>Pagamento:</strong> ${agendamento.pagamento}</p>
      <p><strong>Total:</strong> ${formatarMoeda(agendamento.valorTotal)}</p>

      ${
        agendamento.observacao
          ? `<div class="observacao"><strong>Obs:</strong> ${agendamento.observacao}</div>`
          : ""
      }

    <div class="acoes">

  <button class="btn-small edit" onclick="editarAgendamento(${agendamento.id})">
    ✏️ Editar
  </button>

  <button class="btn-small success" onclick="marcarComoAtendido(${agendamento.id})">
    Atendido
  </button>

  <button class="btn-small" onclick="cancelarAgendamento(${agendamento.id})">
    Cancelar
  </button>

  <button class="btn-small danger" onclick="excluirAgendamento(${agendamento.id})">
    Excluir
  </button>

</div>
    `;

    listaAgenda.appendChild(card);
  });

  atualizarCards();
  renderizarCalendarioVisual();
}

function atualizarCards() {
  const totalAgendamentos = agendamentos.length;


  const totalPrevisto = agendamentos
  .filter((item) => {
    return item.status !== "Cancelado" && item.status !== "Atendido";
  })
  .reduce((total, item) => total + item.valorTotal, 0);
  
  const totalFinanceiro = agendamentos
    .filter((item) => item.status === "Atendido")
    .reduce((total, item) => total + item.valorTotal, 0);

  totalAgendamentosTexto.innerHTML = totalAgendamentos;
  totalPrevistoTexto.innerHTML = formatarMoeda(totalPrevisto);
  totalFinanceiroTexto.innerHTML = formatarMoeda(totalFinanceiro);
}

btnSalvar.addEventListener("click", salvarAgendamento);

btnLimpar.addEventListener("click", () => {
  const confirmar = confirm("Deseja apagar todos os agendamentos?");

  if (!confirmar) {
    return;
  }

  agendamentos = [];
  salvarAgendamentos();
  renderizarAgenda();
});

renderizarProcedimentos();
colocarDataDeHoje();
renderizarAgenda();
renderizarCalendarioVisual();
atualizarResumoProcedimentos();

dataInput.addEventListener("change", renderizarCalendarioVisual);


document.addEventListener("click", (event) => {
  const clicouNoCampoCliente = clienteInput.contains(event.target);
  const clicouNasSugestoes = sugestoesClientes.contains(event.target);

  if (!clicouNoCampoCliente && !clicouNasSugestoes) {
    sugestoesClientes.style.display = "none";
  }
});