const SUPABASE_URL = "https://ptgehrxuuwyydylkgizl.supabase.co";

const SUPABASE_KEY = "sb_publishable_NILNEZZRUtdVgDLqsbwlOg_WGCBDlNy";

const { createClient } = supabase;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

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
const historicoFinanceiro = document.querySelector("#historico-financeiro");
const btnOcultarValores = document.querySelector("#btn-ocultar-valores");

const financeiroHojeTexto = document.querySelector("#financeiro-hoje");
const financeiroSemanaTexto = document.querySelector("#financeiro-semana");
const financeiroMesTexto = document.querySelector("#financeiro-mes");

const authContainer = document.querySelector("#auth-container");
const app = document.querySelector("#app");
const authEmail = document.querySelector("#auth-email");
const authPassword = document.querySelector("#auth-password");
const btnLogin = document.querySelector("#btn-login");
const btnRegister = document.querySelector("#btn-register");
const btnGoogle = document.querySelector("#btn-google");
const btnForgotPassword = document.querySelector("#btn-forgot-password");
const btnTogglePassword = document.querySelector("#btn-toggle-password");
const perfilEmail = document.querySelector("#perfil-email");
const btnLogout = document.querySelector("#btn-logout");
const perfilLogo = document.querySelector("#perfil-logo");
const perfilAvatar = document.querySelector("#perfil-avatar");
const perfilTitulo = document.querySelector("#perfil-titulo");

const perfilNomeTexto = document.querySelector("#perfil-nome-texto");
const perfilTelefoneTexto = document.querySelector("#perfil-telefone-texto");
const perfilStudioTexto = document.querySelector("#perfil-studio-texto");
const btnEditarPerfil = document.querySelector("#btn-editar-perfil");

const modalPerfil = document.querySelector("#modal-perfil");
const modalNome = document.querySelector("#modal-nome");
const modalTelefone = document.querySelector("#modal-telefone");
const modalStudio = document.querySelector("#modal-studio");
const btnCancelarModal = document.querySelector("#btn-cancelar-modal");
const btnSalvarModal = document.querySelector("#btn-salvar-modal");

let usuarioLogado = null;
let clientes = JSON.parse(localStorage.getItem("rl-clientes")) || [];
let agendamentos = JSON.parse(localStorage.getItem("rl-agendamentos")) || [];
let idEditando = null;
let filtroAtualAgenda = "Agendado";
let valoresOcultos = false;

btnRegister.addEventListener("click", async () => {
  const email = authEmail.value.trim();
  const password = authPassword.value.trim();

  if (!email || !password) {
    alert("Preencha e-mail e senha.");
    return;
  }

  const { error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Conta criada com sucesso!");
});

btnLogin.addEventListener("click", async () => {
  const email = authEmail.value.trim();
  const password = authPassword.value.trim();

  if (!email || !password) {
    alert("Preencha e-mail e senha.");
    return;
  }

  btnLogin.innerHTML = "Entrando...";
  btnLogin.disabled = true;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    btnLogin.innerHTML = "Entrar";
    btnLogin.disabled = false;
    alert(error.message);
    return;
  }

  usuarioLogado = data.user;

  authContainer.style.display = "none";
  app.style.display = "block";

  await carregarAgendamentosSupabase();

  await carregarPerfil();

  btnLogin.innerHTML = "Entrar";
  btnLogin.disabled = false;
});

btnGoogle.addEventListener("click", async () => {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    alert(error.message);
  }
});

btnForgotPassword.addEventListener("click", async () => {
  const email = authEmail.value.trim();

  if (!email) {
    alert("Digite seu e-mail para recuperar a senha.");
    return;
  }

  const { error } = await supabaseClient.auth.resetPasswordForEmail(email);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Enviamos um link de recuperação para seu e-mail.");
});

btnTogglePassword.addEventListener("click", () => {
  if (authPassword.type === "password") {
    authPassword.type = "text";
    btnTogglePassword.innerHTML = "🙈";
  } else {
    authPassword.type = "password";
    btnTogglePassword.innerHTML = "👁️";
  }
});

const procedimentos = [
  { nome: "Design de sobrancelha", valor: 30, duracao: 20 },
  { nome: "Design com henna", valor: 40, duracao: 30 },
  { nome: "Volume Brasileiro", valor: 105, duracao: 150 },
  { nome: "Manutenção Volume Brasileiro", valor: 90, duracao: 120 },
  { nome: "Extensão de cílios Fox", valor: 140, duracao: 150 },
  { nome: "Manutenção de cílios Fox", valor: 100, duracao: 120 },
  { nome: "Extensão de cílios Sirena", valor: 120, duracao: 150 },
  { nome: "Manutenção de cílios Sirena", valor: 90, duracao: 120 },
  { nome: "Extensão de cílios Luxo", valor: 130, duracao: 150 },
  { nome: "Manutenção de cílios Luxo", valor: 95, duracao: 120 },
  { nome: "Brow Lamination", valor: 100, duracao: 60 },
  { nome: "Depilação Axila", valor: 25, duracao: 15 },
  { nome: "Depilação Buço", valor: 10, duracao: 10 },
  { nome: "Depilação Queixo", valor: 7, duracao: 10 },
  { nome: "Depilação Perna completa", valor: 65, duracao: 35 },
  { nome: "Depilação Meia Perna", valor: 35, duracao: 20 },
];

function filtrarAgenda(status, botaoClicado) {
  filtroAtualAgenda = status;

  const botoes = document.querySelectorAll(".filtro-btn");

  botoes.forEach((botao) => {
    botao.classList.remove("active");
  });

  botaoClicado.classList.add("active");

  renderizarAgenda();
}

function valorFinanceiro(valor) {
  if (valoresOcultos) {
    return "R$ ••••••";
  }

  return formatarMoeda(valor);
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function salvarClientes() {
  localStorage.setItem("rl-clientes", JSON.stringify(clientes));
}

function existeConflitoDeHorario(
  novaData,
  novoInicio,
  novoFim,
  idIgnorar = null,
) {
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

    const inicioExistente = converterHorarioParaMinutos(
      agendamento.horarioInicio,
    );
    const fimExistente = converterHorarioParaMinutos(agendamento.horarioFim);

    return novoInicioMin < fimExistente && novoFimMin > inicioExistente;
  });
}

async function salvarAgendamentoSupabase(agendamento) {
  const { data, error } = await supabaseClient
    .from("agendamentos")
    .insert([
      {
        user_id: usuarioLogado.id,

        cliente: agendamento.cliente,
        telefone: agendamento.telefone,
        data: agendamento.data,
        horario_inicio: agendamento.horarioInicio,
        horario_fim: agendamento.horarioFim,
        pagamento: agendamento.pagamento,
        status: agendamento.status,
        observacao: agendamento.observacao,
        valor_total: agendamento.valorTotal,
        tempo_total: agendamento.duracaoTotal,
        procedimentos: agendamento.procedimentos,
      },
    ])
    .select();

  if (error) {
    console.error("Erro ao salvar no Supabase:", error);
    alert("Erro ao salvar online. Veja o console.");
    return null;
  }

  return data[0];
}

async function atualizarAgendamentoSupabase(agendamento) {
  const { error } = await supabaseClient
    .from("agendamentos")
    .update({
      cliente: agendamento.cliente,
      telefone: agendamento.telefone,
      data: agendamento.data,
      horario_inicio: agendamento.horarioInicio,
      horario_fim: agendamento.horarioFim,
      pagamento: agendamento.pagamento,
      status: agendamento.status,
      observacao: agendamento.observacao,
      valor_total: agendamento.valorTotal,
      tempo_total: agendamento.duracaoTotal,
      procedimentos: agendamento.procedimentos,
    })
    .eq("id", agendamento.id);

  if (error) {
    console.error("Erro ao atualizar:", error);
    alert("Erro ao atualizar no Supabase.");
    return false;
  }

  return true;
}

async function excluirAgendamentoSupabase(id) {
  const { error } = await supabaseClient
    .from("agendamentos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erro ao excluir:", error);
    alert("Erro ao excluir no Supabase.");
    return false;
  }

  return true;
}

function salvarAgendamentos() {
  localStorage.setItem("rl-agendamentos", JSON.stringify(agendamentos));
}

function colocarDataDeHoje() {
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  const dataLocal = `${ano}-${mes}-${dia}`;

  if (!dataInput.value) {
    dataInput.value = dataLocal;
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

function formatarTelefonePerfil(valor) {
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

function empurrarAgendamentos(
  dataAgendamento,
  novoInicio,
  duracaoNova,
  idIgnorar = null,
) {
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
      agendamentos[index].horarioInicio,
    );

    if (inicioAtual < fimAtual) {
      const duracao = agendamentos[index].duracaoTotal;

      agendamentos[index].horarioInicio = converterMinutosParaHorario(fimAtual);

      agendamentos[index].horarioFim = converterMinutosParaHorario(
        fimAtual + duracao,
      );

      fimAtual = fimAtual + duracao;
    } else {
      fimAtual = converterHorarioParaMinutos(agendamentos[index].horarioFim);
    }
  });
}

async function salvarAgendamento() {
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
    const atualizadoOnline = await atualizarAgendamentoSupabase(
      agendamentoAtualizado,
    );

    if (!atualizadoOnline) {
      return;
    }
  } else {
    const salvoOnline = await salvarAgendamentoSupabase(agendamentoAtualizado);

    if (!salvoOnline) {
      return;
    }

    agendamentoAtualizado.id = salvoOnline.id;
  }

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

async function marcarComoAtendido(id) {
  const agendamento = agendamentos.find((item) => item.id === id);

  if (!agendamento) {
    return;
  }

  const agendamentoAtualizado = {
    ...agendamento,
    status: "Atendido",
  };

  const atualizadoOnline = await atualizarAgendamentoSupabase(
    agendamentoAtualizado,
  );

  if (!atualizadoOnline) {
    return;
  }

  agendamentos = agendamentos.map((item) => {
    if (item.id === id) {
      return agendamentoAtualizado;
    }

    return item;
  });

  salvarAgendamentos();
  renderizarAgenda();
}

async function cancelarAgendamento(id) {
  const agendamento = agendamentos.find((item) => item.id === id);

  if (!agendamento) {
    return;
  }

  const agendamentoAtualizado = {
    ...agendamento,
    status: "Cancelado",
  };

  const atualizadoOnline = await atualizarAgendamentoSupabase(
    agendamentoAtualizado,
  );

  if (!atualizadoOnline) {
    return;
  }

  agendamentos = agendamentos.map((item) => {
    if (item.id === id) {
      return agendamentoAtualizado;
    }

    return item;
  });

  salvarAgendamentos();
  renderizarAgenda();
}

async function excluirAgendamento(id) {
  const confirmar = confirm("Tem certeza que deseja excluir este agendamento?");

  if (!confirmar) {
    return;
  }

  const excluidoOnline = await excluirAgendamentoSupabase(id);

  if (!excluidoOnline) {
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

  const agendamentosDoDia = agendamentos.filter((agendamento) => {
    return (
      agendamento.data === dataSelecionada && agendamento.status !== "Cancelado"
    );
  });

  const horarios = [];

  for (let minutos = 8 * 60; minutos <= 20 * 60; minutos += 30) {
    horarios.push(converterMinutosParaHorario(minutos));
  }

  agendamentosDoDia.forEach((agendamento) => {
    if (!horarios.includes(agendamento.horarioInicio)) {
      horarios.push(agendamento.horarioInicio);
    }
  });

  horarios.sort((a, b) => {
    return converterHorarioParaMinutos(a) - converterHorarioParaMinutos(b);
  });

  horarios.forEach((horario) => {
    const horarioMin = converterHorarioParaMinutos(horario);

    const agendamentoEncontrado = agendamentosDoDia.find((agendamento) => {
      const inicio = converterHorarioParaMinutos(agendamento.horarioInicio);
      const fim = converterHorarioParaMinutos(agendamento.horarioFim);

      return horarioMin === inicio;
    });

    const ocupadoPorOutroHorario = agendamentosDoDia.find((agendamento) => {
      const inicio = converterHorarioParaMinutos(agendamento.horarioInicio);
      const fim = converterHorarioParaMinutos(agendamento.horarioFim);

      return horarioMin > inicio && horarioMin < fim;
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
    } else if (ocupadoPorOutroHorario) {
      linha.innerHTML = `
        <div class="horario">${horario}</div>

        <div class="slot em-andamento">
          Em atendimento
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

async function carregarAgendamentosSupabase() {
  const { data, error } = await supabaseClient
    .from("agendamentos")
    .select("*")
    .eq("user_id", usuarioLogado.id)
    .order("data", { ascending: true })
    .order("horario_inicio", { ascending: true });

  if (error) {
    console.error("Erro ao carregar agendamentos:", error);
    alert("Erro ao carregar dados online.");
    return;
  }

  agendamentos = data.map((item) => {
    return {
      id: item.id,
      cliente: item.cliente,
      telefone: item.telefone,
      data: item.data,
      horarioInicio: item.horario_inicio,
      horarioFim: item.horario_fim,
      pagamento: item.pagamento,
      status: item.status,
      observacao: item.observacao,
      valorTotal: Number(item.valor_total),
      duracaoTotal: item.tempo_total,
      procedimentos: item.procedimentos || [],
    };
  });

  salvarAgendamentos();
  renderizarAgenda();
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

  let agendamentosFiltrados = [...agendamentos];

  if (filtroAtualAgenda !== "Todos") {
    agendamentosFiltrados = agendamentosFiltrados.filter((agendamento) => {
      return agendamento.status === filtroAtualAgenda;
    });
  }

  const agendamentosOrdenados = agendamentosFiltrados.sort((a, b) => {
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
  renderizarHistoricoFinanceiro();
  atualizarResumoFinanceiro();
}

function renderizarHistoricoFinanceiro() {
  historicoFinanceiro.innerHTML = "";

  const atendidos = agendamentos
    .filter((agendamento) => agendamento.status === "Atendido")
    .sort((a, b) => {
      return (
        new Date(`${b.data}T${b.horarioInicio}`) -
        new Date(`${a.data}T${a.horarioInicio}`)
      );
    });

  if (atendidos.length === 0) {
    historicoFinanceiro.innerHTML = `
      <div class="vazio">
        Nenhum procedimento concluído ainda.
      </div>
    `;
    return;
  }

  const gruposPorDia = {};

  atendidos.forEach((agendamento) => {
    if (!gruposPorDia[agendamento.data]) {
      gruposPorDia[agendamento.data] = [];
    }

    gruposPorDia[agendamento.data].push(agendamento);
  });

  Object.keys(gruposPorDia)
    .sort((a, b) => new Date(b) - new Date(a))
    .forEach((data) => {
      const grupo = gruposPorDia[data];

      const totalDoDia = grupo.reduce((total, agendamento) => {
        return total + agendamento.valorTotal;
      }, 0);

      const blocoDia = document.createElement("div");
      blocoDia.classList.add("historico-dia");

      blocoDia.innerHTML = `
        <div class="historico-dia-header">
          <h3>${data.split("-").reverse().join("/")}</h3>
          <strong>${valorFinanceiro(totalDoDia)}</strong>
        </div>
      `;

      grupo.forEach((agendamento) => {
        const procedimentosTexto = agendamento.procedimentos
          .map((procedimento) => procedimento.nome)
          .join(" + ");

        const item = document.createElement("div");
        item.classList.add("historico-item");

        item.innerHTML = `
          <div>
            <strong>${agendamento.cliente}</strong>
            <span>${procedimentosTexto}</span>
            <small>${agendamento.horarioInicio} • ${agendamento.pagamento}</small>
          </div>

          <strong>${valorFinanceiro(agendamento.valorTotal)}</strong>
        `;

        blocoDia.appendChild(item);
      });

      historicoFinanceiro.appendChild(blocoDia);
    });
}

function atualizarResumoFinanceiro() {
  const hoje = new Date();

  const hojeFormatado = hoje.toISOString().split("T")[0];

  const inicioSemana = new Date(hoje);
  inicioSemana.setDate(hoje.getDate() - hoje.getDay());

  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  const atendidos = agendamentos.filter((agendamento) => {
    return agendamento.status === "Atendido";
  });

  const totalHoje = atendidos
    .filter((agendamento) => agendamento.data === hojeFormatado)
    .reduce((total, agendamento) => total + agendamento.valorTotal, 0);

  const totalSemana = atendidos
    .filter((agendamento) => {
      const dataAgendamento = new Date(`${agendamento.data}T00:00:00`);
      return dataAgendamento >= inicioSemana && dataAgendamento <= hoje;
    })
    .reduce((total, agendamento) => total + agendamento.valorTotal, 0);

  const totalMes = atendidos
    .filter((agendamento) => {
      const dataAgendamento = new Date(`${agendamento.data}T00:00:00`);
      return dataAgendamento >= inicioMes && dataAgendamento <= hoje;
    })
    .reduce((total, agendamento) => total + agendamento.valorTotal, 0);

  financeiroHojeTexto.innerHTML = valorFinanceiro(totalHoje);
  financeiroSemanaTexto.innerHTML = valorFinanceiro(totalSemana);
  financeiroMesTexto.innerHTML = valorFinanceiro(totalMes);
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
  totalPrevistoTexto.innerHTML = valorFinanceiro(totalPrevisto);
  totalFinanceiroTexto.innerHTML = valorFinanceiro(totalFinanceiro);
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

btnOcultarValores.addEventListener("click", () => {
  valoresOcultos = !valoresOcultos;

  if (valoresOcultos) {
    btnOcultarValores.innerHTML = "Mostrar valores";
  } else {
    btnOcultarValores.innerHTML = "Ocultar valores";
  }

  atualizarCards();
  renderizarHistoricoFinanceiro();
  atualizarResumoFinanceiro();
});

function mostrarSecao(idSecao, botaoClicado) {
  const secoes = document.querySelectorAll(".app-section");

  secoes.forEach((secao) => {
    secao.classList.remove("active-section");
  });

  const secaoEscolhida = document.getElementById(idSecao);

  if (secaoEscolhida) {
    secaoEscolhida.classList.add("active-section");
  }

  const botoes = document.querySelectorAll(".menu-btn");

  botoes.forEach((botao) => {
    botao.classList.remove("active");
  });

  botaoClicado.classList.add("active");
}

btnEditarPerfil.addEventListener("click", () => {
  modalNome.value =
    perfilNomeTexto.innerHTML === "Não informado" ? "" : perfilNomeTexto.innerHTML;

  modalTelefone.value =
    perfilTelefoneTexto.innerHTML === "Não informado" ? "" : perfilTelefoneTexto.innerHTML;

  modalStudio.value =
    perfilStudioTexto.innerHTML === "Não informado" ? "" : perfilStudioTexto.innerHTML;

  modalPerfil.classList.remove("oculto");
});

btnCancelarModal.addEventListener("click", () => {
  modalPerfil.classList.add("oculto");
});

modalTelefone.addEventListener("input", () => {
  modalTelefone.value = formatarTelefonePerfil(modalTelefone.value);
});

btnSalvarModal.addEventListener("click", async () => {
  const logoUrl = await uploadLogo();

  const perfilAtualizado = {
    id: usuarioLogado.id,
    nome: modalNome.value.trim(),
    telefone: modalTelefone.value.trim(),
    nome_estudio: modalStudio.value.trim(),
  };

  if (logoUrl) {
    perfilAtualizado.logo_url = logoUrl;
  }

  const salvo = await salvarPerfil(perfilAtualizado);

  if (!salvo) return;

  perfilNomeTexto.innerHTML = perfilAtualizado.nome || "Não informado";
  perfilTelefoneTexto.innerHTML = perfilAtualizado.telefone || "Não informado";
  perfilStudioTexto.innerHTML =
    perfilAtualizado.nome_estudio || "Não informado";

  perfilTitulo.innerHTML =
    perfilAtualizado.nome_estudio || "Perfil profissional";

  modalPerfil.classList.add("oculto");
});

document.addEventListener("click", async (event) => {
  if (event.target.id === "btn-logout") {
    console.log("Clicou no botão sair");

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      console.error("Erro ao sair:", error);
      alert("Erro ao sair da conta.");
      return;
    }

    usuarioLogado = null;

    localStorage.removeItem("supabase.auth.token");
    sessionStorage.clear();

    authContainer.style.display = "flex";
    app.style.display = "none";

    location.reload();
  }
});

async function verificarSessao() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    console.error("Erro ao verificar sessão:", error);
    authContainer.style.display = "flex";
    app.style.display = "none";
    return;
  }

  if (data.session) {
    usuarioLogado = data.session.user;

    authContainer.style.display = "none";
    app.style.display = "block";

    await carregarAgendamentosSupabase();
    await carregarPerfil();
  } else {
    usuarioLogado = null;

    authContainer.style.display = "flex";
    app.style.display = "none";
  }
}

async function carregarPerfil() {
  if (!usuarioLogado) return;

  perfilEmail.innerHTML = usuarioLogado.email;

  const { data, error } = await supabaseClient
    .from("perfis")
    .select("*")
    .eq("id", usuarioLogado.id)
    .maybeSingle();

  if (error) {
    console.error("Erro ao carregar perfil:", error);
    return;
  }

  if (!data) {
    perfilTitulo.innerHTML = "Perfil profissional";
    perfilNomeTexto.innerHTML = "Não informado";
    perfilTelefoneTexto.innerHTML = "Não informado";
    perfilStudioTexto.innerHTML = "Não informado";
    return;
  }

  perfilNomeTexto.innerHTML = data.nome || "Não informado";
  perfilTelefoneTexto.innerHTML = data.telefone || "Não informado";
  perfilStudioTexto.innerHTML = data.nome_estudio || "Não informado";

  perfilTitulo.innerHTML = data.nome_estudio || "Perfil profissional";

  if (data.logo_url) {
    perfilAvatar.innerHTML = `
      <img src="${data.logo_url}" alt="Logo do Studio">
    `;
  }
}

async function salvarPerfil(perfilAtualizado) {
  if (!usuarioLogado) {
    alert("Usuário não logado.");
    return;
  }

  const { error } = await supabaseClient
    .from("perfis")
    .upsert(perfilAtualizado);

  if (error) {
    console.error("Erro ao salvar perfil:", error);
    alert("Erro ao salvar perfil.");
    return false;
  }

  return true;
}

async function uploadLogo() {
  const arquivo = perfilLogo.files[0];

  if (!arquivo) {
    return null;
  }

  const extensao = arquivo.name.split(".").pop();

  const nomeArquivo = `${usuarioLogado.id}.${extensao}`;

  const { error } = await supabaseClient.storage
    .from("logos")
    .upload(nomeArquivo, arquivo, {
      upsert: true,
    });

  if (error) {
    console.error(error);
    alert("Erro ao enviar logo.");
    return null;
  }

  const { data } = supabaseClient.storage
    .from("logos")
    .getPublicUrl(nomeArquivo);

  return data.publicUrl;
}


perfilAvatar.addEventListener("click", () => {
  perfilLogo.click();
});

perfilLogo.addEventListener("change", () => {
  const arquivo = perfilLogo.files[0];

  if (!arquivo) return;

  perfilAvatar.innerHTML = `
    <img src="${URL.createObjectURL(arquivo)}" alt="Logo do Studio">
  `;
});

verificarSessao();
