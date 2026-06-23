const SUPABASE_URL = "https://ptgehrxuuwyydylkgizl.supabase.co";

const SUPABASE_KEY = "sb_publishable_NILNEZZRUtdVgDLqsbwlOg_WGCBDlNy";

const { createClient } = supabase;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
});

const clienteInput = document.querySelector("#cliente");
const telefoneInput = document.querySelector("#telefone");
const dataInput = document.querySelector("#data");
const profissionalSelect = document.querySelector("#profissional");
const horarioInput = document.querySelector("#horario");
const pagamentoInput = document.querySelector("#pagamento");
const statusInput = document.querySelector("#status");
const observacaoInput = document.querySelector("#observacao");

const procedimentosLista = document.querySelector("#procedimentos-lista");
const tempoTotalTexto = document.querySelector("#tempo-total");
const valorTotalTexto = document.querySelector("#valor-total");

const listaAgenda = document.querySelector("#lista-agenda");

const totalAgendamentosTexto = document.querySelector("#total-agendamentos");
const totalPrevistoTexto = document.querySelector("#total-previsto");
const totalFinanceiroTexto = document.querySelector("#total-financeiro");

const calendarioVisual = document.querySelector("#calendario-visual");
const dataCalendarioTexto = document.querySelector("#data-calendario");

const sugestoesClientes = document.querySelector("#sugestoes-clientes");
const historicoFinanceiro = document.querySelector("#historico-financeiro");

const financeiroHojeTexto = document.querySelector("#financeiro-hoje");
const financeiroSemanaTexto = document.querySelector("#financeiro-semana");
const financeiroMesTexto = document.querySelector("#financeiro-mes");

const ticketMedioTexto = document.querySelector("#ticket-medio");
const procedimentoMaisRealizadoTexto = document.querySelector(
  "#procedimento-mais-realizado",
);
const procedimentoMaisRealizadoQtd = document.querySelector(
  "#procedimento-mais-realizado-qtd",
);
const totalAtendimentosFinanceiro = document.querySelector(
  "#total-atendimentos-financeiro",
);
const topClientes = document.querySelector("#top-clientes");
const buscaClienteAgenda = document.querySelector("#busca-cliente-agenda");

const authContainer = document.querySelector("#auth-container");
const app = document.querySelector("#app");
const authEmail = document.querySelector("#auth-email");
const authPassword = document.querySelector("#auth-password");
const lembrarMe = document.querySelector("#lembrar-me");

const perfilEmail = document.querySelector("#perfil-email");
const perfilLogo = document.querySelector("#perfil-logo");
const perfilAvatar = document.querySelector("#perfil-avatar");
const perfilTitulo = document.querySelector("#perfil-titulo");
const perfilNomeTexto = document.querySelector("#perfil-nome-texto");
const perfilTelefoneTexto = document.querySelector("#perfil-telefone-texto");
const perfilStudioTexto = document.querySelector("#perfil-studio-texto");

const modalPerfil = document.querySelector("#modal-perfil");
const modalNome = document.querySelector("#modal-nome");
const modalTelefone = document.querySelector("#modal-telefone");
const modalStudio = document.querySelector("#modal-studio");

const btnSalvar = document.querySelector("#btn-salvar");
const btnLimpar = document.querySelector("#btn-limpar");
const btnOcultarValores = document.querySelector("#btn-ocultar-valores");
const btnLogin = document.querySelector("#btn-login");
const btnGoogle = document.querySelector("#btn-google");
const btnLogout = document.querySelector("#btn-logout");
const btnRegister = document.querySelector("#btn-register");
const btnForgotPassword = document.querySelector("#btn-forgot-password");
const btnTogglePassword = document.querySelector("#btn-toggle-password");
const btnEditarPerfil = document.querySelector("#btn-editar-perfil");
const btnCancelarModal = document.querySelector("#btn-cancelar-modal");
const btnSalvarModal = document.querySelector("#btn-salvar-modal");
const btnSalvarProcedimento = document.querySelector(
  "#btn-salvar-procedimento",
);
const profissionalNome = document.querySelector("#profissional-nome");
const profissionalTelefone = document.querySelector("#profissional-telefone");

const btnSalvarProfissional = document.querySelector(
  "#btn-salvar-profissional",
);
const filtroProfissionalFinanceiro = document.querySelector(
  "#filtro-profissional-financeiro",
);

const listaProfissionais = document.querySelector("#lista-profissionais");
const btnAlterarSenha = document.querySelector("#btn-alterar-senha");
const btnCancelarSenha = document.querySelector("#btn-cancelar-senha");
const btnSalvarSenha = document.querySelector("#btn-salvar-senha");
const btnSalvarDespesa = document.querySelector("#btn-salvar-despesa");
const btnGerarPdf = document.querySelector("#btn-gerar-pdf");
const inputDataInicioPdf = document.getElementById("pdfDataInicio");
const inputDataFimPdf = document.getElementById("pdfDataFim");

const hojePdf = new Date();

const primeiroDiaMesPdf = new Date(
  hojePdf.getFullYear(),
  hojePdf.getMonth(),
  1,
);

if (inputDataInicioPdf && inputDataFimPdf) {
  inputDataInicioPdf.value = primeiroDiaMesPdf.toISOString().split("T")[0];
  inputDataFimPdf.value = hojePdf.toISOString().split("T")[0];
}

const procedimentoNome = document.querySelector("#procedimento-nome");
const procedimentoValor = document.querySelector("#procedimento-valor");
const procedimentoDuracao = document.querySelector("#procedimento-duracao");
const duracaoFormatada = document.querySelector("#duracao-formatada");
procedimentoDuracao.addEventListener("input", () => {
  const minutos = Number(procedimentoDuracao.value);

  if (!minutos) {
    duracaoFormatada.innerHTML = "";
    return;
  }

  duracaoFormatada.innerHTML = formatarTempo(minutos);
});

const listaProcedimentos = document.querySelector("#lista-procedimentos");
const btnOrganizarProcedimentos = document.querySelector(
  "#btn-organizar-procedimentos",
);
const listaHistorico = document.querySelector("#lista-historico");

const modalSenha = document.querySelector("#modal-senha");

const novaSenha = document.querySelector("#nova-senha");
const confirmarSenha = document.querySelector("#confirmar-senha");
const senhaAtual = document.querySelector("#senha-atual");

const toggleSenhaAtual = document.querySelector("#toggle-senha-atual");
const toggleNovaSenha = document.querySelector("#toggle-nova-senha");
const toggleConfirmarSenha = document.querySelector("#toggle-confirmar-senha");

const dashboardReceita = document.querySelector("#dashboard-receita");
const dashboardDespesas = document.querySelector("#dashboard-despesas");
const dashboardLucro = document.querySelector("#dashboard-lucro");
const listaDespesas = document.querySelector("#lista-despesas");
const despesaDescricaoInput = document.querySelector("#despesa-descricao");
const despesaCategoriaInput = document.querySelector("#despesa-categoria");
const despesaValorInput = document.querySelector("#despesa-valor");
const despesaDataInput = document.querySelector("#despesa-data");
const despesaProfissionalInput = document.querySelector(
  "#despesa-profissional",
);

let despesas = [];

let usuarioLogado = null;
let clientes = JSON.parse(localStorage.getItem("rl-clientes")) || [];
let agendamentos = JSON.parse(localStorage.getItem("rl-agendamentos")) || [];
let idEditando = null;
let idProcedimentoEditando = null;
let filtroAtualAgenda = "Agendado";
let valoresOcultos = false;
let profissionais = [];
let modoRecuperacaoSenha = false;
let organizandoProcedimentos = false;
let idProfissionalEditando = null;

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
    tratarErroSupabase(error, "Erro ao criar conta. Tente novamente.");
    return;
  }

  alert(
    "Conta criada com sucesso!\n\n" +
      "Enviamos um e-mail de confirmação para o endereço informado.\n\n" +
      "Antes de acessar o Studio Manager, confirme seu e-mail através do link enviado.",
  );
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

    tratarErroSupabase(error, "E-mail ou senha incorretos.");

    return;
  }

  usuarioLogado = data.user;

  if (lembrarMe && lembrarMe.checked) {
    localStorage.setItem("rl-lembrar-email", email);
  } else {
    localStorage.removeItem("rl-lembrar-email");
  }

  authContainer.style.display = "none";
  app.style.display = "block";

  await carregarPerfil();
  await carregarProcedimentos();
  await carregarAgendamentosSupabase();
  await carregarDespesasSupabase();

  profissionais = await carregarProfissionaisSupabase();

  renderizarProfissionais();
  carregarSelectProfissionais();
  carregarFiltroProfissionalFinanceiro();
  carregarSelectDespesaProfissional();

  btnLogin.innerHTML = "Entrar";
  btnLogin.disabled = false;
});

btnGoogle.addEventListener("click", async () => {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://iamrubenskelvin.github.io/RL-Studio-Manager/",
    },
  });

  if (error) {
    tratarErroSupabase(error, "Erro ao entrar com Google.");
    return;
  }
});

btnForgotPassword.addEventListener("click", async () => {
  const email = authEmail.value.trim();

  if (!email) {
    alert("Digite seu e-mail para recuperar a senha.");
    return;
  }

  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: "https://iamrubenskelvin.github.io/RL-Studio-Manager/",
  });

  if (error) {
    tratarErroSupabase(error, "Erro ao enviar recuperação de senha.");
    return;
  }

  alert("Enviamos um link de recuperação para seu e-mail.");
});

if (btnOrganizarProcedimentos) {
  btnOrganizarProcedimentos.addEventListener("click", () => {
    organizandoProcedimentos = !organizandoProcedimentos;

    btnOrganizarProcedimentos.textContent = organizandoProcedimentos
      ? "Concluir"
      : "Organizar";

    carregarProcedimentos();
  });
}

btnTogglePassword.addEventListener("click", () => {
  const icone = btnTogglePassword.querySelector("span");

  if (authPassword.type === "password") {
    authPassword.type = "text";
    icone.textContent = "visibility_off";
  } else {
    authPassword.type = "password";
    icone.textContent = "visibility";
  }
});

let procedimentos = [];

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

function tratarErroSupabase(
  error,
  mensagemPadrao = "Ocorreu um erro. Tente novamente.",
) {
  console.error(error);

  const mensagem = error?.message || "";

  if (mensagem.includes("Email not confirmed")) {
    alert(
      "Seu e-mail ainda não foi confirmado.\n\n" +
        "Verifique sua caixa de entrada e clique no link de confirmação.",
    );
    return;
  }

  if (mensagem.includes("User already registered")) {
    alert("Este e-mail já possui uma conta cadastrada.");
    return;
  }

  if (
    mensagem.includes("rate limit") ||
    mensagem.includes("Too Many Requests")
  ) {
    alert(
      "Muitas tentativas realizadas.\n\n" +
        "Aguarde alguns minutos e tente novamente.",
    );
    return;
  }

  alert(mensagemPadrao);
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
        profissional_id: Number(agendamento.profissionalId),
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
    tratarErroSupabase(error, "Erro ao salvar agendamento.");
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
      profissional_id: Number(agendamento.profissionalId),
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
    tratarErroSupabase(error, "Erro ao atualizar agendamento.");
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
    tratarErroSupabase(error, "Erro ao excluir agendamento.");
    return false;
  }

  return true;
}

async function salvarDespesaSupabase(despesa) {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { data, error } = await supabaseClient
    .from("despesas")
    .insert([
      {
        user_id: user.id,
        descricao: despesa.descricao,
        categoria: despesa.categoria,
        valor: despesa.valor,
        data: despesa.data,
        profissional_id:
          despesa.profissionalId === "studio"
            ? null
            : Number(despesa.profissionalId),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erro ao salvar despesa:", error);
    return null;
  }

  return data;
}

async function salvarProfissionalSupabase(profissional) {
  if (!usuarioLogado) {
    alert("Usuário não logado.");
    return null;
  }

  const { data, error } = await supabaseClient
    .from("profissionais")
    .insert([
      {
        user_id: usuarioLogado.id,
        nome: profissional.nome,
        telefone: profissional.telefone,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erro ao salvar profissional:", error);
    alert("Erro ao salvar profissional.");
    return null;
  }

  return data;
}

async function atualizarProfissionalSupabase(profissional) {
  const { data, error } = await supabaseClient
    .from("profissionais")
    .update({
      nome: profissional.nome,
      telefone: profissional.telefone,
    })
    .eq("id", profissional.id)
    .eq("user_id", usuarioLogado.id)
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar profissional:", error);
    alert("Erro ao atualizar profissional.");
    return null;
  }

  return data;
}

function editarProfissional(id) {
  const profissional = profissionais.find((item) => {
    return item.id === id;
  });

  if (!profissional) {
    return;
  }

  idProfissionalEditando = id;

  profissionalNome.value = profissional.nome;
  profissionalTelefone.value = profissional.telefone || "";

  btnSalvarProfissional.innerHTML = "Salvar alterações";
  profissionalNome.focus();
}

async function excluirProfissionalSupabase(id) {
  const { error } = await supabaseClient
    .from("profissionais")
    .delete()
    .eq("id", id)
    .eq("user_id", usuarioLogado.id);

  if (error) {
    console.error("Erro ao excluir profissional:", error);
    alert("Erro ao excluir profissional.");
    return false;
  }

  return true;
}

async function excluirProfissional(id) {
  const agendamentosVinculados = agendamentos.filter((agendamento) => {
    return Number(agendamento.profissionalId) === Number(id);
  });

  const despesasVinculadas = despesas.filter((despesa) => {
    return Number(despesa.profissionalId) === Number(id);
  });

  if (agendamentosVinculados.length > 0 || despesasVinculadas.length > 0) {
    alert(
      `Não é possível excluir esta profissional.\n\n` +
        `Existem registros vinculados:\n` +
        `• ${agendamentosVinculados.length} agendamento(s)\n` +
        `• ${despesasVinculadas.length} despesa(s)\n\n` +
        `Para proteger o histórico financeiro, edite ou remova esses registros antes de excluir.`,
    );
    return;
  }

  const confirmar = confirm("Deseja excluir esta profissional?");

  if (!confirmar) return;

  const excluido = await excluirProfissionalSupabase(id);

  if (!excluido) return;

  profissionais = profissionais.filter((profissional) => {
    return profissional.id !== id;
  });

  renderizarProfissionais();
  carregarSelectProfissionais();
  carregarFiltroProfissionalFinanceiro();
  carregarSelectDespesaProfissional();

  alert("Profissional excluída com sucesso!");
}

async function carregarProfissionaisSupabase() {
  if (!usuarioLogado) return [];

  const { data, error } = await supabaseClient
    .from("profissionais")
    .select("*")
    .order("nome");

  if (error) {
    console.error("Erro ao carregar profissionais:", error);
    return [];
  }

  return data || [];
}

async function carregarDespesasSupabase() {
  if (!usuarioLogado) {
    return;
  }

  const { data, error } = await supabaseClient
    .from("despesas")
    .select("*")
    .order("data", { ascending: false });

  if (error) {
    console.error("Erro ao carregar despesas:", error);
    return;
  }

  despesas = data.map((item) => {
    return {
      id: item.id,
      descricao: item.descricao,
      categoria: item.categoria,
      valor: Number(item.valor),
      data: item.data,
      profissionalId: item.profissional_id,
    };
  });

  renderizarDespesas();
  atualizarResumoFinanceiro();
}

async function excluirDespesaSupabase(id) {
  const { error } = await supabaseClient.from("despesas").delete().eq("id", id);

  if (error) {
    console.error("Erro ao excluir despesa:", error);
    return false;
  }

  return true;
}

function salvarAgendamentos() {
  localStorage.setItem("rl-agendamentos", JSON.stringify(agendamentos));
}

async function salvarProfissional() {
  const nome = profissionalNome.value.trim();
  const telefone = profissionalTelefone.value.trim();

  if (!nome) {
    alert("Informe o nome da profissional.");
    return;
  }

  const profissional = {
    id: idProfissionalEditando,
    nome,
    telefone,
  };

  let profissionalSalva = null;

  if (idProfissionalEditando) {
    profissionalSalva = await atualizarProfissionalSupabase(profissional);

    if (!profissionalSalva) return;

    profissionais = profissionais.map((item) => {
      if (item.id === idProfissionalEditando) {
        return profissionalSalva;
      }

      return item;
    });

    idProfissionalEditando = null;
    btnSalvarProfissional.innerHTML = "Salvar profissional";
  } else {
    profissionalSalva = await salvarProfissionalSupabase(profissional);

    if (!profissionalSalva) return;

    profissionais.push(profissionalSalva);
  }

  renderizarProfissionais();
  carregarSelectProfissionais();
  carregarFiltroProfissionalFinanceiro();
  carregarSelectDespesaProfissional();

  profissionalNome.value = "";
  profissionalTelefone.value = "";

  alert(
    idProfissionalEditando
      ? "Profissional atualizada com sucesso!"
      : "Profissional cadastrada com sucesso!",
  );
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

profissionalTelefone.addEventListener("input", () => {
  profissionalTelefone.value = formatarTelefone(profissionalTelefone.value);
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
  <span>${formatarMoeda(procedimento.valor)} • ${formatarTempo(procedimento.duracao)}</span>
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
    return `${horas} hora${horas > 1 ? "s" : ""}`;
  }

  return `${horas} hora${horas > 1 ? "s" : ""} e ${minutosRestantes} min`;
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

function definirProximoHorarioDisponivel() {
  const dataSelecionada = dataInput.value;

  if (!dataSelecionada) {
    horarioInput.value = "08:00";
    return;
  }

  const agendamentosDoDia = agendamentos
    .filter((agendamento) => {
      return (
        agendamento.data === dataSelecionada &&
        agendamento.status !== "Cancelado"
      );
    })
    .sort((a, b) => {
      return (
        converterHorarioParaMinutos(a.horarioFim) -
        converterHorarioParaMinutos(b.horarioFim)
      );
    });

  if (agendamentosDoDia.length === 0) {
    horarioInput.value = "08:00";
    return;
  }

  const ultimoAgendamento = agendamentosDoDia[agendamentosDoDia.length - 1];

  const proximoMinuto =
    converterHorarioParaMinutos(ultimoAgendamento.horarioFim) + 1;

  horarioInput.value = converterMinutosParaHorario(proximoMinuto);
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
  definirProximoHorarioDisponivel();
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
  const profissionalId = profissionalSelect.value;
  const horario = horarioInput.value;
  const pagamento = pagamentoInput.value;
  const status = statusInput.value;
  const observacao = observacaoInput.value.trim();

  const selecionados = pegarProcedimentosSelecionados();

  if (
    cliente === "" ||
    telefone === "" ||
    data === "" ||
    profissionalId === "" ||
    horario === ""
  ) {
    alert("Preencha cliente, telefone, data, profissional e horário.");
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
    profissionalId,
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

async function confirmarAgendamento(id) {
  const agendamento = agendamentos.find((item) => item.id === id);

  if (!agendamento) {
    return;
  }

  const enviarWhatsapp = confirm("Deseja enviar confirmação pelo WhatsApp?");

  const agendamentoAtualizado = {
    ...agendamento,
    status: "Confirmado",
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

  if (enviarWhatsapp) {
    let telefone = agendamento.telefone.replace(/\D/g, "");

    if (!telefone.startsWith("55")) {
      telefone = `55${telefone}`;
    }

    const dataFormatada = agendamento.data.split("-").reverse().join("/");

    const procedimentosTexto = agendamento.procedimentos
      .map((p) => p.nome)
      .join(", ");

    const nomeStudio = perfilStudioTexto.innerHTML || "Studio";

    const mensagem = [
      `Olá, ${agendamento.cliente}!`,
      "",
      "Seu horário foi confirmado.",
      "",
      `Data: ${dataFormatada}`,
      `Horário: ${agendamento.horarioInicio}`,
      `Procedimento: ${procedimentosTexto}`,
      "",
      "Estamos te aguardando!",
      "",
      nomeStudio,
    ].join("\n");

    window.open(
      `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
    );
  }
  salvarAgendamentos();
  renderizarAgenda();
}

function enviarConfirmacaoWhatsapp(id) {
  const agendamento = agendamentos.find((item) => item.id === id);

  if (!agendamento) {
    return;
  }

  let telefone = agendamento.telefone.replace(/\D/g, "");

  if (!telefone.startsWith("55")) {
    telefone = `55${telefone}`;
  }

  const dataFormatada = agendamento.data.split("-").reverse().join("/");

  const procedimentosTexto = agendamento.procedimentos
    .map((p) => p.nome)
    .join(", ");

  const nomeStudio = perfilStudioTexto.innerHTML || "Studio";

  const mensagem = [
    `Olá, ${agendamento.cliente}!`,
    "",
    "Seu horário foi confirmado.",
    "",
    `Data: ${dataFormatada}`,
    `Horário: ${agendamento.horarioInicio}`,
    `Procedimento: ${procedimentosTexto}`,
    "",
    "Estamos te aguardando!",
    "",
    nomeStudio,
  ].join("\n");

  window.open(
    `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`,
    "_blank",
  );
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

  mostrarSecao(
    "agenda-section",
    document.querySelector('[onclick*="agenda-section"]'),
  );

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
    tratarErroSupabase(error, "Erro ao carregar agendamentos.");
    return;
  }

  agendamentos = data.map((item) => {
    return {
      id: item.id,
      cliente: item.cliente,
      telefone: item.telefone,
      data: item.data,
      profissionalId: item.profissional_id,
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
  definirProximoHorarioDisponivel();
}

function renderizarProfissionais() {
  listaProfissionais.innerHTML = "";

  if (profissionais.length === 0) {
    listaProfissionais.innerHTML = `
      <div class="vazio">
        Nenhuma profissional cadastrada.
      </div>
    `;
    return;
  }

  profissionais.forEach((profissional) => {
    const card = document.createElement("div");

    card.classList.add("item-procedimento");

    card.innerHTML = `
  <div>
    <strong>${profissional.nome}</strong>
    <span>${profissional.telefone || "-"}</span>
  </div>

  <div class="acoes">
    <button
      class="btn-small edit"
      onclick="editarProfissional(${profissional.id})"
      type="button"
    >
      ✏️ Editar
    </button>

    <button
      class="btn-excluir-profissional"
      onclick="excluirProfissional(${profissional.id})"
      type="button"
    >
      🗑️
    </button>
  </div>
`;

    listaProfissionais.appendChild(card);
  });
}

function carregarSelectProfissionais() {
  if (!profissionalSelect) return;

  profissionalSelect.innerHTML = `
    <option value="">Selecione a profissional</option>
  `;

  profissionais.forEach((profissional) => {
    profissionalSelect.innerHTML += `
      <option value="${profissional.id}">
        ${profissional.nome}
      </option>
    `;
  });
  if (profissionais.length === 1) {
    profissionalSelect.value = profissionais[0].id;
  }
}

function carregarFiltroProfissionalFinanceiro() {
  if (!filtroProfissionalFinanceiro) return;

  filtroProfissionalFinanceiro.innerHTML = `
    <option value="todos">Todos</option>
  `;

  profissionais.forEach((profissional) => {
    filtroProfissionalFinanceiro.innerHTML += `
      <option value="${profissional.id}">
        ${profissional.nome}
      </option>
    `;
  });
}

function carregarSelectDespesaProfissional() {
  if (!despesaProfissionalInput) return;

  despesaProfissionalInput.innerHTML = `
    <option value="studio">Studio / Geral</option>
  `;

  profissionais.forEach((profissional) => {
    despesaProfissionalInput.innerHTML += `
      <option value="${profissional.id}">
        ${profissional.nome}
      </option>
    `;
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
    renderizarHistoricoFinanceiro();
    atualizarResumoFinanceiro();
    renderizarHistoricoGeral();
    return;
  }

  let agendamentosFiltrados = [...agendamentos];

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  agendamentosFiltrados = agendamentosFiltrados.filter((agendamento) => {
    const dataAgendamento = new Date(`${agendamento.data}T00:00:00`);

    return dataAgendamento >= hoje;
  });

  const textoBusca = buscaClienteAgenda
    ? buscaClienteAgenda.value.trim().toLowerCase()
    : "";

  const textoBuscaNumeros = textoBusca.replace(/\D/g, "");

  if (textoBusca !== "") {
    agendamentosFiltrados = agendamentosFiltrados.filter((agendamento) => {
      const nomeCliente = agendamento.cliente
        ? agendamento.cliente.toLowerCase()
        : "";

      const telefoneCliente = agendamento.telefone
        ? agendamento.telefone.replace(/\D/g, "")
        : "";

      const encontrouNome = nomeCliente.includes(textoBusca);

      const encontrouTelefone =
        textoBuscaNumeros !== "" && telefoneCliente.includes(textoBuscaNumeros);

      return encontrouNome || encontrouTelefone;
    });
  }

  if (filtroAtualAgenda !== "Todos") {
    agendamentosFiltrados = agendamentosFiltrados.filter((agendamento) => {
      if (filtroAtualAgenda === "Agendado") {
        return (
          agendamento.status === "Agendado" ||
          agendamento.status === "Confirmado"
        );
      }

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

    const profissionalDoAgendamento = profissionais.find((profissional) => {
      return profissional.id === Number(agendamento.profissionalId);
    });

    const nomeProfissional = profissionalDoAgendamento
      ? profissionalDoAgendamento.nome
      : "Não informada";

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

      <p><strong>Data:</strong> ${agendamento.data.split("-").reverse().join("/")}</p>
      <p><strong>Profissional:</strong> ${nomeProfissional}</p>
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

  <button
    class="btn-small edit"
    onclick="editarAgendamento(${agendamento.id})"
  >
    ✏️ Editar
  </button>

  ${
    agendamento.status === "Confirmado"
      ? `<button
        class="btn-small confirm"
        onclick="enviarConfirmacaoWhatsapp(${agendamento.id})"
      >
        Reenviar WhatsApp
      </button>`
      : `<button
        class="btn-small confirm"
        onclick="confirmarAgendamento(${agendamento.id})"
      >
        Confirmar
      </button>`
  }

  <button
    class="btn-small success"
    onclick="marcarComoAtendido(${agendamento.id})"
  >
    ✔️ Atendido
  </button>

  <button
    class="btn-small"
    onclick="cancelarAgendamento(${agendamento.id})"
  >
    Cancelar
  </button>

  <button
    class="btn-small danger"
    onclick="excluirAgendamento(${agendamento.id})"
  >
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
  renderizarHistoricoGeral();
}

function renderizarHistoricoGeral() {
  if (!listaHistorico) {
    return;
  }

  listaHistorico.innerHTML = "";

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const historico = agendamentos
    .filter((agendamento) => {
      const dataAgendamento = new Date(`${agendamento.data}T00:00:00`);

      return (
        dataAgendamento < hoje ||
        agendamento.status === "Atendido" ||
        agendamento.status === "Cancelado" ||
        agendamento.status === "Reagendado"
      );
    })
    .sort((a, b) => {
      return (
        new Date(`${b.data}T${b.horarioInicio}`) -
        new Date(`${a.data}T${a.horarioInicio}`)
      );
    });

  if (historico.length === 0) {
    listaHistorico.innerHTML = `
      <div class="vazio">
        Nenhum histórico encontrado.
      </div>
    `;
    return;
  }

  historico.forEach((agendamento) => {
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

      <p><strong>Data:</strong> ${agendamento.data.split("-").reverse().join("/")}</p>
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
  <button
    class="btn-small edit"
    onclick="editarAgendamento(${agendamento.id})"
  >
    ✏️ Editar
  </button>

  <button
    class="btn-small danger"
    onclick="excluirAgendamento(${agendamento.id})"
  >
    Excluir
  </button>
</div>
`;

    listaHistorico.appendChild(card);
  });
}

function renderizarHistoricoFinanceiro() {
  if (!historicoFinanceiro) {
    return;
  }

  historicoFinanceiro.innerHTML = "";

  const profissionalSelecionada =
    filtroProfissionalFinanceiro?.value || "todos";

  const atendidos = agendamentos
    .filter((agendamento) => {
      const statusValido = agendamento.status === "Atendido";

      const profissionalValida =
        profissionalSelecionada === "todos" ||
        Number(agendamento.profissionalId) === Number(profissionalSelecionada);

      return statusValido && profissionalValida;
    })

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
  inicioSemana.setHours(0, 0, 0, 0);

  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  const profissionalSelecionada =
    filtroProfissionalFinanceiro?.value || "todos";

  const atendidos = agendamentos.filter((agendamento) => {
    const statusValido = agendamento.status === "Atendido";

    const profissionalValida =
      profissionalSelecionada === "todos" ||
      Number(agendamento.profissionalId) === Number(profissionalSelecionada);

    return statusValido && profissionalValida;
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

  const ticketMedio =
    atendidos.length > 0
      ? atendidos.reduce((total, agendamento) => {
          return total + agendamento.valorTotal;
        }, 0) / atendidos.length
      : 0;

  const procedimentosContagem = {};

  atendidos.forEach((agendamento) => {
    agendamento.procedimentos.forEach((procedimento) => {
      if (!procedimentosContagem[procedimento.nome]) {
        procedimentosContagem[procedimento.nome] = 0;
      }

      procedimentosContagem[procedimento.nome]++;
    });
  });

  let procedimentoMaisRealizado = "Nenhum ainda";
  let quantidadeProcedimento = 0;

  Object.keys(procedimentosContagem).forEach((nome) => {
    if (procedimentosContagem[nome] > quantidadeProcedimento) {
      procedimentoMaisRealizado = nome;
      quantidadeProcedimento = procedimentosContagem[nome];
    }
  });

  const clientesRanking = {};

  atendidos.forEach((agendamento) => {
    if (!clientesRanking[agendamento.cliente]) {
      clientesRanking[agendamento.cliente] = {
        quantidade: 0,
        total: 0,
      };
    }

    clientesRanking[agendamento.cliente].quantidade++;
    clientesRanking[agendamento.cliente].total += agendamento.valorTotal;
  });

  const top5Clientes = Object.entries(clientesRanking)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 5);

  financeiroHojeTexto.innerHTML = valorFinanceiro(totalHoje);
  financeiroSemanaTexto.innerHTML = valorFinanceiro(totalSemana);
  financeiroMesTexto.innerHTML = valorFinanceiro(totalMes);

  const despesasMes = despesas
    .filter((despesa) => {
      const dataDespesa = new Date(`${despesa.data}T00:00:00`);

      const dataValida = dataDespesa >= inicioMes && dataDespesa <= hoje;

      const profissionalValida =
        profissionalSelecionada === "todos" ||
        Number(despesa.profissionalId) === Number(profissionalSelecionada);

      return dataValida && profissionalValida;
    })
    .reduce((total, despesa) => total + despesa.valor, 0);

  const lucroMes = totalMes - despesasMes;

  if (dashboardReceita) {
    dashboardReceita.innerHTML = valorFinanceiro(totalMes);
  }

  if (dashboardDespesas) {
    dashboardDespesas.innerHTML = valorFinanceiro(despesasMes);
  }

  if (dashboardLucro) {
    dashboardLucro.innerHTML = valorFinanceiro(lucroMes);
  }

  ticketMedioTexto.innerHTML = valorFinanceiro(ticketMedio);
  procedimentoMaisRealizadoTexto.innerHTML = procedimentoMaisRealizado;
  procedimentoMaisRealizadoQtd.innerHTML =
    quantidadeProcedimento === 1
      ? "1 atendimento"
      : `${quantidadeProcedimento} atendimentos`;

  totalAtendimentosFinanceiro.innerHTML = atendidos.length;

  topClientes.innerHTML = "";

  if (top5Clientes.length === 0) {
    topClientes.innerHTML = `
      <div class="vazio">
        Nenhum cliente atendido ainda.
      </div>
    `;
  } else {
    top5Clientes.forEach(([nome, dados], index) => {
      const item = document.createElement("div");
      item.classList.add("top-cliente-item");

      item.innerHTML = `
        <div>
          <strong>${index + 1}. ${nome}</strong>
          <small>${dados.quantidade} atendimento(s)</small>
        </div>

        <span>${valorFinanceiro(dados.total)}</span>
      `;

      topClientes.appendChild(item);
    });
  }
}

function atualizarCards() {
  const profissionalSelecionada =
    filtroProfissionalFinanceiro?.value || "todos";

  const agendamentosFiltrados = agendamentos.filter((agendamento) => {
    return (
      profissionalSelecionada === "todos" ||
      Number(agendamento.profissionalId) === Number(profissionalSelecionada)
    );
  });

  const totalAgendamentos = agendamentosFiltrados.length;

  const totalPrevisto = agendamentosFiltrados
    .filter((agendamento) => {
      return (
        agendamento.status === "Agendado" || agendamento.status === "Confirmado"
      );
    })
    .reduce((total, agendamento) => {
      return total + agendamento.valorTotal;
    }, 0);

  const totalFinanceiro = agendamentosFiltrados
    .filter((agendamento) => {
      return agendamento.status === "Atendido";
    })
    .reduce((total, agendamento) => {
      return total + agendamento.valorTotal;
    }, 0);

  if (totalAgendamentosTexto) {
    totalAgendamentosTexto.innerHTML = totalAgendamentos;
  }

  if (totalPrevistoTexto) {
    totalPrevistoTexto.innerHTML = valorFinanceiro(totalPrevisto);
  }

  if (totalFinanceiroTexto) {
    totalFinanceiroTexto.innerHTML = valorFinanceiro(totalFinanceiro);
  }
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

colocarDataDeHoje();
renderizarCalendarioVisual();
atualizarResumoProcedimentos();
definirProximoHorarioDisponivel();

dataInput.addEventListener("change", () => {
  renderizarCalendarioVisual();
  definirProximoHorarioDisponivel();
});

document.addEventListener("click", (event) => {
  const clicouNoCampoCliente = clienteInput.contains(event.target);
  const clicouNasSugestoes = sugestoesClientes.contains(event.target);

  if (!clicouNoCampoCliente && !clicouNasSugestoes) {
    sugestoesClientes.style.display = "none";
  }
});

if (btnOcultarValores) {
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
}

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
    perfilNomeTexto.innerHTML === "Não informado"
      ? ""
      : perfilNomeTexto.innerHTML;

  modalTelefone.value =
    perfilTelefoneTexto.innerHTML === "Não informado"
      ? ""
      : perfilTelefoneTexto.innerHTML;

  modalStudio.value =
    perfilStudioTexto.innerHTML === "Não informado"
      ? ""
      : perfilStudioTexto.innerHTML;

  modalPerfil.classList.remove("oculto");
});

btnCancelarModal.addEventListener("click", () => {
  modalPerfil.classList.add("oculto");
});

btnAlterarSenha.addEventListener("click", () => {
  modalSenha.classList.remove("oculto");

  novaSenha.value = "";
  confirmarSenha.value = "";
});

btnCancelarSenha.addEventListener("click", () => {
  modalSenha.classList.add("oculto");
});

btnSalvarSenha.addEventListener("click", async () => {
  const recuperandoSenha = modoRecuperacaoSenha;
  const senhaAtualDigitada = senhaAtual.value.trim();
  const senha = novaSenha.value.trim();
  const confirmar = confirmarSenha.value.trim();

  if (!recuperandoSenha && !senhaAtualDigitada) {
    alert("Digite sua senha atual.");
    return;
  }

  if (senha.length < 6) {
    alert("A nova senha deve ter pelo menos 6 caracteres.");
    return;
  }

  if (senha !== confirmar) {
    alert("As senhas não coincidem.");
    return;
  }

  if (!recuperandoSenha) {
    const { error: erroSenhaAtual } =
      await supabaseClient.auth.signInWithPassword({
        email: usuarioLogado.email,
        password: senhaAtualDigitada,
      });

    if (erroSenhaAtual) {
      alert("Senha atual incorreta.");
      return;
    }
  }

  const { error } = await supabaseClient.auth.updateUser({
    password: senha,
  });

  if (error) {
    console.error(error);
    alert("Erro ao alterar senha.");
    return;
  }

  senhaAtual.value = "";
  novaSenha.value = "";
  confirmarSenha.value = "";

  modalSenha.classList.add("oculto");

  alert("Senha alterada com sucesso!");

  modoRecuperacaoSenha = false;
  senhaAtual.parentElement.style.display = "block";
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

    await carregarPerfil();
    await carregarProcedimentos();
    await carregarAgendamentosSupabase();
    await carregarDespesasSupabase();

    profissionais = await carregarProfissionaisSupabase();

    renderizarProfissionais();
    carregarSelectProfissionais();
    carregarFiltroProfissionalFinanceiro();
    carregarSelectDespesaProfissional();
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

async function salvarProcedimento() {
  if (!usuarioLogado) return;

  const nome = procedimentoNome.value.trim();
  const valor = Number(procedimentoValor.value);
  const duracao = Number(procedimentoDuracao.value);

  if (!nome) {
    alert("Informe o nome do procedimento.");
    return;
  }

  if (valor <= 0) {
    alert("Informe um valor válido.");
    return;
  }

  if (duracao <= 0) {
    alert("Informe a duração em minutos.");
    return;
  }

  if (idProcedimentoEditando) {
    const { error } = await supabaseClient
      .from("procedimentos")
      .update({
        nome,
        valor,
        duracao,
      })
      .eq("id", idProcedimentoEditando)
      .eq("user_id", usuarioLogado.id);

    if (error) {
      console.error(error);
      alert("Erro ao atualizar procedimento.");
      return;
    }

    idProcedimentoEditando = null;
    btnSalvarProcedimento.innerHTML = "Salvar procedimento";
  } else {
    const { error } = await supabaseClient.from("procedimentos").insert({
      user_id: usuarioLogado.id,
      nome,
      valor,
      duracao,
    });

    if (error) {
      console.error(error);
      alert("Erro ao salvar procedimento.");
      return;
    }
  }

  procedimentoNome.value = "";
  procedimentoValor.value = "";
  procedimentoDuracao.value = "";

  await carregarProcedimentos();
}

async function moverProcedimento(id, direcao) {
  const { data, error } = await supabaseClient
    .from("procedimentos")
    .select("*")
    .order("ordem", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  const indiceAtual = data.findIndex((item) => item.id === id);

  if (indiceAtual === -1) return;

  const indiceDestino = direcao === "subir" ? indiceAtual - 1 : indiceAtual + 1;

  if (indiceDestino < 0 || indiceDestino >= data.length) {
    return;
  }

  const atual = data[indiceAtual];
  const destino = data[indiceDestino];

  const ordemAtual = atual.ordem;
  const ordemDestino = destino.ordem;

  const { error: erro1 } = await supabaseClient
    .from("procedimentos")
    .update({ ordem: ordemDestino })
    .eq("id", atual.id);

  if (erro1) {
    console.error(erro1);
    return;
  }

  const { error: erro2 } = await supabaseClient
    .from("procedimentos")
    .update({ ordem: ordemAtual })
    .eq("id", destino.id);

  if (erro2) {
    console.error(erro2);
    return;
  }

  carregarProcedimentos();
}

async function carregarProcedimentos() {
  if (!usuarioLogado) return;

  const { data, error } = await supabaseClient
    .from("procedimentos")
    .select("*")
    .order("ordem", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  procedimentos = data.map((item) => {
    return {
      id: item.id,
      nome: item.nome,
      valor: Number(item.valor),
      duracao: Number(item.duracao),
      ordem: item.ordem,
    };
  });

  renderizarProcedimentos();

  listaProcedimentos.innerHTML = "";

  if (data.length === 0) {
    listaProcedimentos.innerHTML = `
      <div class="vazio">
        Nenhum procedimento cadastrado ainda.
      </div>
    `;
    return;
  }

  data.forEach((procedimento) => {
    listaProcedimentos.innerHTML += `
      <div class="item-procedimento">
        <div>
          <strong>${procedimento.nome}</strong>
          <p>${formatarMoeda(Number(procedimento.valor))}</p>
          <span>${procedimento.duracao} min</span>
        </div>

        <div class="acoes">
          ${
            organizandoProcedimentos
              ? `
      <button
        class="btn-small"
        onclick="moverProcedimento(${procedimento.id}, 'subir')"
      >
        ⬆️
      </button>

      <button
        class="btn-small"
        onclick="moverProcedimento(${procedimento.id}, 'descer')"
      >
        ⬇️
      </button>
    `
              : ""
          }

          <button
            class="btn-small edit"
            onclick="editarProcedimento(${procedimento.id}, '${procedimento.nome}', ${procedimento.valor}, ${procedimento.duracao})"
          >
            ✏️ Editar
          </button>

          <button
            class="btn-small danger"
            onclick="excluirProcedimento(${procedimento.id})"
          >
            Excluir
          </button>
        </div>
      </div>
    `;
  });
}

function editarProcedimento(id, nome, valor, duracao) {
  idProcedimentoEditando = id;

  procedimentoNome.value = nome;
  procedimentoValor.value = valor;
  procedimentoDuracao.value = duracao;

  btnSalvarProcedimento.innerHTML = "Salvar alterações";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

async function excluirProcedimento(id) {
  const confirmar = confirm("Deseja excluir este procedimento?");

  if (!confirmar) return;

  const { error } = await supabaseClient
    .from("procedimentos")
    .delete()
    .eq("id", id)
    .eq("user_id", usuarioLogado.id);

  if (error) {
    console.error(error);
    alert("Erro ao excluir procedimento.");
    return;
  }

  await carregarProcedimentos();
}

btnSalvarProcedimento.addEventListener("click", salvarProcedimento);

function alternarVisibilidade(input, botao) {
  const icone = botao.querySelector("span");

  if (input.type === "password") {
    input.type = "text";
    icone.textContent = "visibility_off";
  } else {
    input.type = "password";
    icone.textContent = "visibility";
  }
}

toggleSenhaAtual.addEventListener("click", () => {
  alternarVisibilidade(senhaAtual, toggleSenhaAtual);
});

toggleNovaSenha.addEventListener("click", () => {
  alternarVisibilidade(novaSenha, toggleNovaSenha);
});

toggleConfirmarSenha.addEventListener("click", () => {
  alternarVisibilidade(confirmarSenha, toggleConfirmarSenha);
});

if (buscaClienteAgenda) {
  buscaClienteAgenda.addEventListener("input", renderizarAgenda);
}

if (filtroProfissionalFinanceiro) {
  filtroProfissionalFinanceiro.addEventListener("change", () => {
    atualizarResumoFinanceiro();
    renderizarHistoricoFinanceiro();
    atualizarCards();
  });
}

supabaseClient.auth.onAuthStateChange((event, session) => {
  console.log("EVENTO:", event);

  if (event === "PASSWORD_RECOVERY") {
    console.log("MODO RECUPERAÇÃO ATIVADO");

    modoRecuperacaoSenha = true;

    modalSenha.classList.remove("oculto");
    senhaAtual.parentElement.style.display = "none";

    alert("Digite sua nova senha.");
  }
});

const emailSalvo = localStorage.getItem("rl-lembrar-email");

if (emailSalvo && authEmail) {
  authEmail.value = emailSalvo;

  if (lembrarMe) {
    lembrarMe.checked = true;
  }
}

verificarSessao();

async function salvarDespesa() {
  const descricao = despesaDescricaoInput.value.trim();
  const categoria = despesaCategoriaInput.value;
  const profissionalId = despesaProfissionalInput.value;
  const valor = Number(despesaValorInput.value);
  const data = despesaDataInput.value;

  if (!descricao || !valor || !data) {
    alert("Preencha todos os campos.");
    return;
  }

  const despesa = {
    descricao,
    categoria,
    valor,
    data,
    profissionalId,
  };

  const despesaSalva = await salvarDespesaSupabase(despesa);

  if (!despesaSalva) {
    return;
  }

  despesas.push(despesaSalva);

  renderizarDespesas();
  atualizarResumoFinanceiro();

  despesaDescricaoInput.value = "";
  despesaValorInput.value = "";
  despesaDataInput.value = "";
  despesaProfissionalInput.value = "studio";
}

function renderizarDespesas() {
  listaDespesas.innerHTML = "";

  if (despesas.length === 0) {
    listaDespesas.innerHTML = `
      <div class="vazio">
        Nenhuma despesa cadastrada.
      </div>
    `;
    return;
  }

  despesas.forEach((despesa) => {
    const item = document.createElement("div");

    item.classList.add("despesa-item");

    item.innerHTML = `
  <div>
    <strong>${despesa.descricao}</strong>
    <small>${despesa.categoria}</small>
  </div>

  <div class="despesa-acoes">
    <span>${formatarMoeda(despesa.valor)}</span>

    <button
      class="btn-small danger"
      onclick="excluirDespesa(${despesa.id})"
    >
      Excluir
    </button>
  </div>
`;

    listaDespesas.appendChild(item);
  });
}

async function excluirDespesa(id) {
  const confirmar = confirm("Deseja excluir esta despesa?");

  if (!confirmar) {
    return;
  }

  const excluidoOnline = await excluirDespesaSupabase(id);

  if (!excluidoOnline) {
    return;
  }

  despesas = despesas.filter((despesa) => despesa.id !== id);

  renderizarDespesas();
  atualizarResumoFinanceiro();
}

btnSalvarDespesa.addEventListener("click", salvarDespesa);

function carregarImagemBase64(caminho) {
  return new Promise((resolve, reject) => {
    const imagem = new Image();
    imagem.crossOrigin = "anonymous";
    imagem.src = caminho;

    imagem.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = imagem.width;
      canvas.height = imagem.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(imagem, 0, 0);

      resolve(canvas.toDataURL("image/png"));
    };

    imagem.onerror = reject;
  });
}

async function gerarRelatorioPdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let totalPaginas = 1;

  const logoBase64 = await carregarImagemBase64("./asset/logo-app.png");

  const dataInicio = document.getElementById("pdfDataInicio")?.value;
  const dataFim = document.getElementById("pdfDataFim")?.value;
  const profissionalSelecionada =
    filtroProfissionalFinanceiro?.value || "todos";

  const nomeProfissionalPdf =
    profissionalSelecionada === "todos"
      ? "Todos"
      : profissionais.find((profissional) => {
          return profissional.id === Number(profissionalSelecionada);
        })?.nome || "Profissional";

  const despesasFiltradas = despesas.filter((despesa) => {
    if (dataInicio && despesa.data < dataInicio) return false;
    if (dataFim && despesa.data > dataFim) return false;

    return (
      profissionalSelecionada === "todos" ||
      Number(despesa.profissionalId) === Number(profissionalSelecionada)
    );
  });

  const agendamentosFiltrados = agendamentos.filter((agendamento) => {
    if (agendamento.status !== "Atendido") return false;
    if (dataInicio && agendamento.data < dataInicio) return false;
    if (dataFim && agendamento.data > dataFim) return false;

    return (
      profissionalSelecionada === "todos" ||
      Number(agendamento.profissionalId) === Number(profissionalSelecionada)
    );
  });

  const totalReceitaPeriodo = agendamentosFiltrados.reduce(
    (total, agendamento) => total + Number(agendamento.valorTotal || 0),
    0,
  );

  const totalDespesasPeriodo = despesasFiltradas.reduce(
    (total, despesa) => total + Number(despesa.valor || 0),
    0,
  );

  const lucroPeriodo = totalReceitaPeriodo - totalDespesasPeriodo;
  const ticketMedioPdf =
    agendamentosFiltrados.length > 0
      ? totalReceitaPeriodo / agendamentosFiltrados.length
      : 0;

  const procedimentosContagem = {};

  agendamentosFiltrados.forEach((agendamento) => {
    agendamento.procedimentos.forEach((procedimento) => {
      procedimentosContagem[procedimento.nome] =
        (procedimentosContagem[procedimento.nome] || 0) + 1;
    });
  });

  let procedimentoMaisRealizadoPdf = "Nenhum ainda";
  let quantidadeProcedimentoPdf = 0;

  Object.keys(procedimentosContagem).forEach((nome) => {
    if (procedimentosContagem[nome] > quantidadeProcedimentoPdf) {
      procedimentoMaisRealizadoPdf = nome;
      quantidadeProcedimentoPdf = procedimentosContagem[nome];
    }
  });

  const clientesRankingPdf = {};

  agendamentosFiltrados.forEach((agendamento) => {
    if (!clientesRankingPdf[agendamento.cliente]) {
      clientesRankingPdf[agendamento.cliente] = {
        quantidade: 0,
        total: 0,
      };
    }

    clientesRankingPdf[agendamento.cliente].quantidade++;
    clientesRankingPdf[agendamento.cliente].total += Number(
      agendamento.valorTotal || 0,
    );
  });

  const topClientesPdf = Object.entries(clientesRankingPdf)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 5);

  const dataGerada = new Date().toLocaleDateString("pt-BR");

  function formatarDataPdf(data) {
    if (!data) return "";
    return data.split("-").reverse().join("/");
  }

  const periodoTexto =
    dataInicio || dataFim
      ? `${formatarDataPdf(dataInicio) || "início"} até ${
          formatarDataPdf(dataFim) || "hoje"
        }`
      : "Todos os registros";

  const rose = [183, 110, 121];
  const gold = [212, 175, 55];
  const dark = [43, 43, 43];
  const gray = [120, 120, 120];
  const light = [250, 247, 248];

  function cardIndicador(titulo, subtitulo, valor, x, y, cor) {
    doc.setFillColor(...light);
    doc.roundedRect(x, y, 52, 48, 6, 6, "F");

    doc.setTextColor(...gray);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(titulo, x + 5, y + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text(subtitulo, x + 5, y + 18);

    doc.setTextColor(...cor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(valor, x + 5, y + 36);
  }

  // CABEÇALHO
  doc.setFillColor(...rose);
  doc.rect(0, 0, 210, 48, "F");

  doc.setDrawColor(...gold);
  doc.setLineWidth(0.6);
  doc.line(20, 28, 92, 28);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("STUDIO MANAGER", 20, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Relatório Financeiro Executivo", 20, 36);

  doc.setFillColor(255, 255, 255);
  doc.circle(178, 24, 15, "F");

  doc.setDrawColor(...gold);
  doc.circle(178, 24, 16, "S");

  doc.addImage(logoBase64, "PNG", 166, 12, 24, 24);

  // INFORMAÇÕES
  doc.setTextColor(...dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Resumo Financeiro", 20, 65);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...gray);
  doc.text(`Gerado em: ${dataGerada}`, 20, 73);
  doc.text(`Profissional: ${nomeProfissionalPdf}`, 20, 81);
  doc.text(`Período: ${periodoTexto}`, 20, 89);

  // CARDS
  cardIndicador(
    "RECEITA TOTAL",
    "Valor recebido no período",
    formatarMoeda(totalReceitaPeriodo),
    20,
    105,
    [46, 173, 107],
  );

  cardIndicador(
    "DESPESAS",
    "Gastos registrados",
    formatarMoeda(totalDespesasPeriodo),
    79,
    105,
    [217, 74, 74],
  );

  cardIndicador(
    "LUCRO LÍQUIDO",
    "Receita menos despesas",
    formatarMoeda(lucroPeriodo),
    138,
    105,
    rose,
  );

  // INDICADORES DO PERÍODO
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...gold);
  doc.roundedRect(20, 166, 82, 68, 5, 5, "FD");

  doc.setTextColor(...rose);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Indicadores", 28, 181);

  doc.setTextColor(...dark);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.text(`Atendimentos: ${agendamentosFiltrados.length}`, 28, 192);

  doc.text(`Ticket médio: ${formatarMoeda(ticketMedioPdf)}`, 28, 202);

  const procedimentoTextoPdf =
    procedimentoMaisRealizadoPdf.length > 24
      ? procedimentoMaisRealizadoPdf.substring(0, 24) + "..."
      : procedimentoMaisRealizadoPdf;

  doc.text("Procedimento Destaque", 28, 214);
  doc.text(`${procedimentoTextoPdf} (${quantidadeProcedimentoPdf}x)`, 28, 224);

  // TOP CLIENTES
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...gold);
  doc.roundedRect(108, 166, 82, 60, 5, 5, "FD");

  doc.setTextColor(...rose);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Top clientes", 116, 181);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...dark);

  if (topClientesPdf.length === 0) {
    doc.text("Nenhum cliente no período.", 116, 197);
  } else {
    topClientesPdf.forEach(([nome, dados], index) => {
      const nomeClientePdf =
        nome.length > 18 ? nome.substring(0, 18) + "..." : nome;

      const linhaY = 196 + index * 8;

      const medalha =
        index === 0 ? "#1" : index === 1 ? "#2" : index === 2 ? "#3" : "•";

      doc.text(`${medalha} ${nomeClientePdf}`, 116, linhaY);
      doc.text(`${dados.quantidade}x`, 158, linhaY);
      doc.text(formatarMoeda(dados.total), 169, linhaY);
    });
  }

  // RESUMO EXECUTIVO (Alinhamento horizontal calibrado com o grid superior)
  doc.setFillColor(...light);
  doc.setDrawColor(...gold);
  doc.roundedRect(20, 232, 170, 42, 5, 5, "FD"); 

  doc.setTextColor(...rose);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Resumo Executivo", 28, 243); 

  const melhorCliente =
    topClientesPdf.length > 0
      ? topClientesPdf[0][0].substring(0, 20)
      : "Nenhum";

  doc.setTextColor(...dark);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  // Garantindo o início em X = 28 para simetria perfeita com o bloco de "Indicadores" acima
  doc.text(`Receita Total: ${formatarMoeda(totalReceitaPeriodo)}`, 28, 251);
  doc.text(`Despesas Totais: ${formatarMoeda(totalDespesasPeriodo)}`, 28, 257);
  doc.text(`Procedimento Destaque: ${procedimentoTextoPdf}`, 28, 263);
  doc.text(`Melhor Cliente: ${melhorCliente}`, 28, 269);

  // Coluna 2 - Lucro Líquido (Ajustado X para 116 para alinhar com a coluna do bloco "Top clientes" logo acima)
  doc.setTextColor(46, 173, 107);
  doc.setFont("helvetica", "bold"); 
  doc.text(`Lucro Líquido: ${formatarMoeda(lucroPeriodo)}`, 116, 251); 
  doc.setFont("helvetica", "normal");

  // RODAPÉ
  doc.setDrawColor(...gold);
  doc.line(20, 280, 190, 280);

  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("RL Studio Manager • Relatório Financeiro Executivo", 20, 288);

  // PÁGINA 2 - HISTÓRICO FINANCEIRO
  doc.addPage();

  doc.setFillColor(...rose);
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Histórico Financeiro", 20, 20);

  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Período: ${periodoTexto}`, 20, 44);
  doc.text(`Profissional: ${nomeProfissionalPdf}`, 20, 51);

  let y = 66;

  doc.setFillColor(...light);
  doc.roundedRect(20, y - 8, 170, 10, 3, 3, "F");

  doc.setTextColor(...dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("Data", 24, y);
  doc.text("Cliente", 48, y);
  doc.text("Procedimento", 94, y);
  doc.text("Valor", 166, y);

  y += 10;

  doc.setFont("helvetica", "normal");

  if (agendamentosFiltrados.length === 0) {
    doc.setTextColor(...gray);
    doc.text("Nenhum atendimento encontrado no período.", 24, y + 8);
  } else {
    agendamentosFiltrados
      .sort((a, b) => {
        return (
          new Date(`${a.data}T${a.horarioInicio}`) -
          new Date(`${b.data}T${b.horarioInicio}`)
        );
      })
      .forEach((agendamento) => {
        if (y > 265) {
          doc.addPage();

          doc.setFillColor(...rose);
          doc.rect(0, 0, 210, 26, "F");

          doc.setTextColor(255, 255, 255);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(14);
          doc.text("Histórico Financeiro", 20, 17);

          y = 42;

          doc.setFillColor(...light);
          doc.roundedRect(20, y - 8, 170, 10, 3, 3, "F");

          doc.setTextColor(...dark);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          doc.text("Data", 24, y);
          doc.text("Cliente", 48, y);
          doc.text("Procedimento", 94, y);
          doc.text("Valor", 166, y);

          y += 10;
          doc.setFont("helvetica", "normal");
        }

        const dataAtendimento = agendamento.data.split("-").reverse().join("/");

        const clientePdf =
          agendamento.cliente.length > 22
            ? agendamento.cliente.substring(0, 22) + "..."
            : agendamento.cliente;

        const procedimentosPdf = agendamento.procedimentos
          .map((procedimento) => procedimento.nome)
          .join(" + ");

        const procedimentosTextoPdf =
          procedimentosPdf.length > 32
            ? procedimentosPdf.substring(0, 32) + "..."
            : procedimentosPdf;

        doc.setTextColor(...dark);
        doc.setFontSize(8);

        doc.text(dataAtendimento, 24, y);
        doc.text(clientePdf, 48, y);
        doc.text(procedimentosTextoPdf, 94, y);
        doc.setTextColor(46, 173, 107);

        doc.text(formatarMoeda(agendamento.valorTotal), 166, y);

        doc.setTextColor(...dark);

        doc.setDrawColor(230, 230, 230);
        doc.line(20, y + 4, 190, y + 4);

        y += 10;
      });
  }

  // RESUMO FINAL DA PÁGINA 2 (Validação de quebra de página aplicada)
  if (y > 250) {
    doc.addPage();
    doc.setFillColor(...rose);
    doc.rect(0, 0, 210, 26, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Histórico Financeiro - Resumo", 20, 17);
    y = 42;
  } else {
    y += 10;
  }

  doc.setDrawColor(...gold);
  doc.line(20, y, 190, y);

  y += 12;

  doc.setTextColor(...dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`Total de atendimentos: ${agendamentosFiltrados.length}`, 24, y);

  doc.setTextColor(46, 173, 107);
  doc.setFontSize(12);
  doc.text(`Receita total: ${formatarMoeda(totalReceitaPeriodo)}`, 24, y + 12);

  // RODAPÉ FIXO PÁGINA 2
  doc.setDrawColor(...gold);
  doc.line(20, 280, 190, 280);
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("RL Studio Manager • Histórico Financeiro", 20, 288);

  // PÁGINA 3 - INTELIGÊNCIA DE NEGÓCIO
  doc.addPage();

  const topProcedimentosPdf = Object.entries(procedimentosContagem)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  doc.setFillColor(...rose);
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Inteligência de Negócio", 20, 20);

  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Período: ${periodoTexto}`, 20, 44);
  doc.text(`Profissional: ${nomeProfissionalPdf}`, 20, 51);

  // TOP PROCEDIMENTOS
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...gold);
  doc.roundedRect(20, 65, 170, 70, 5, 5, "FD");

  doc.setTextColor(...rose);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Top Procedimentos", 28, 80);

  doc.setTextColor(...dark);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  if (topProcedimentosPdf.length === 0) {
    doc.text("Nenhum procedimento encontrado no período.", 28, 96);
  } else {
    topProcedimentosPdf.forEach(([nome, qtd], index) => {
      const nomeProcedimento =
        nome.length > 45 ? nome.substring(0, 45) + "..." : nome;

      doc.text(`${index + 1}. ${nomeProcedimento}`, 28, 96 + index * 9);
      doc.text(`${qtd} atendimento(s)`, 150, 96 + index * 9);
    });
  }

  // TOP CLIENTES
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...gold);
  doc.roundedRect(20, 150, 170, 70, 5, 5, "FD");

  doc.setTextColor(...rose);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Top Clientes", 28, 165);

  doc.setTextColor(...dark);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  if (topClientesPdf.length === 0) {
    doc.text("Nenhum cliente encontrado no período.", 28, 181);
  } else {
    topClientesPdf.forEach(([nome, dados], index) => {
      const nomeCliente =
        nome.length > 38 ? nome.substring(0, 38) + "..." : nome;

      doc.text(`${index + 1}. ${nomeCliente}`, 28, 181 + index * 9);
      doc.text(`${dados.quantidade}x`, 130, 181 + index * 9);

      doc.setTextColor(46, 173, 107);
      doc.text(formatarMoeda(dados.total), 150, 181 + index * 9);
      doc.setTextColor(...dark);
    });
  }

  // INDICADORES ESTRATÉGICOS
  doc.setFillColor(...light);
  doc.setDrawColor(...gold);
  doc.roundedRect(20, 235, 170, 32, 5, 5, "FD");

  doc.setTextColor(...rose);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Indicadores Estratégicos", 28, 248);

  doc.setTextColor(...dark);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.text(`Ticket médio: ${formatarMoeda(ticketMedioPdf)}`, 28, 256);

  doc.text(`Procedimento campeão: ${procedimentoTextoPdf}`, 28, 263);

  doc.text(`Lucro líquido: ${formatarMoeda(lucroPeriodo)}`, 95, 256);

  doc.text(`Atendimentos: ${agendamentosFiltrados.length}`, 95, 263);

  doc.setDrawColor(...gold);
  doc.line(20, 280, 190, 280);

  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.text("RL Studio Manager • Inteligência de Negócio", 20, 288);

  totalPaginas = doc.getNumberOfPages();

  for (let i = 1; i <= totalPaginas; i++) {
    doc.setPage(i);

    doc.setTextColor(...gray);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");

    // Alinhamento perfeito à direita baseado no limite da margem do documento (190mm)
    doc.text(`Página ${i} de ${totalPaginas}`, 190, 288, { align: "right" });
  }

  doc.save("relatorio-financeiro-studio-manager.pdf");
}

if (btnGerarPdf) {
  btnGerarPdf.addEventListener("click", gerarRelatorioPdf);
}

if (btnSalvarProfissional) {
  btnSalvarProfissional.addEventListener("click", salvarProfissional);
}
