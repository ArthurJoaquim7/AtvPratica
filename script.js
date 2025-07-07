const consultas = [];

function logar(tipo) {
  // Esconde todas as seções
  document.getElementById("paciente").classList.add("hidden");
  document.getElementById("profissional").classList.add("hidden");
  document.getElementById("adm").classList.add("hidden");

  // Exibe somente a seção do tipo selecionado
  document.getElementById(tipo).classList.remove("hidden");

  // Se for administrador, atualiza os dados
  if (tipo === "adm") {
    renderizarLeitos();
    renderizarSuprimentos();
  }
}

function desabilitarPerfis(perfis) {
  perfis.forEach((perfil) => {
    const button = document.querySelector(`a[onclick="logar('${perfil}')"]`);
    button.parentElement.style.display = "none"; // Oculta o botão
  });
}
function cadastrarPaciente(event) {
  event.preventDefault(); // Impede o reload da página

  const form = document.getElementById("formCadastro");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const nome = document.getElementById("nome").value;
  const contato = document.getElementById("contato").value;

  document.getElementById("formCadastro").classList.add("hidden");
  const dados = `<p><strong>Nome:</strong> ${nome}</p>
                   <p><strong>Contato:</strong> ${contato}</p>`;
  document.getElementById("dadosPaciente").innerHTML = dados;
  document.getElementById("dadosPaciente").classList.remove("hidden");

  document.getElementById("agendamento").classList.remove("hidden"); // ✅ Mostra corretamente
  preencherHorarios();
}

function preencherHorarios() {
  const select = document.getElementById("horarioSelect");
  select.innerHTML = "";
  for (let h = 8; h <= 17; h++) {
    let opt = document.createElement("option");
    opt.value = `${h}:00`;
    opt.innerText = `${h}:00`;
    select.appendChild(opt);
  }
}

function agendarConsulta() {
  const especialidade = document.getElementById("especialidadeSelect").value;
  const horario = document.getElementById("horarioSelect").value;
  const card = document.getElementById("agendamentoCard");

  const agendamento = {
    especialidade,
    horario,
  };

  consultas.push(agendamento);

  card.innerHTML += `<p><strong>Consulta:</strong> ${especialidade} às ${horario}</p>`;
}

function cancelarAgendamento() {
  document.getElementById("agendamentoCard").innerHTML = "";
  consultas.length = 0;
  document.getElementById("consultaProfissional").innerText = "";
}

function mostrarPerfil() {
  const esp = document.getElementById("especialidadeSelect").value;
  const perfil = document.getElementById("perfilProfissional");
  const perfis = {
    Dentista: {
      nome: "Dr. João - Dentista - 40 anos. Especialista em odontologia preventiva e estética.",
      imagem: "img/man1.jpeg",
    },
    Dermatologista: {
      nome: "Dra. Carla - Dermatologista - 38 anos. Experiente em doenças da pele e tratamentos estéticos.",
      imagem: "img/wom1.jpeg",
    },
    Cardiologista: {
      nome: "Dr. Marcos - Cardiologista - 50 anos. Atua em prevenção e cuidados com o coração.",
      imagem: "img/man2.jpeg",
    },
    Neurologista: {
      nome: "Dra. Lúcia - Neurologista - 45 anos. Focada em doenças neurológicas e saúde mental.",
      imagem: "img/wom2.jpeg",
    },
  };
  const dados = perfis[esp];
  perfil.innerHTML = `<div class="perfil-container"><img class="perfil-img" src="${dados.imagem}" alt="Foto do profissional"><p>${dados.nome}</p></div>`;
}
function exibirPerfilProfissional() {
  const esp = document.getElementById("profissionalSelect").value;
  const perfil = document.getElementById("perfilSelecionado");
  const imagens = {
    Dentista: "img/man1.jpeg",
    Dermatologista: "img/wom1.jpeg",
    Cardiologista: "img/man2.jpeg",
    Neurologista: "img/wom2.jpeg",
  };
  const textos = {
    Dentista: "Dr. João - Dentista - 40 anos. Especialista em odontologia preventiva e estética.",
    Dermatologista: "Dra. Carla - Dermatologista - 38 anos. Experiente em doenças da pele e tratamentos estéticos.",
    Cardiologista: "Dr. Marcos - Cardiologista - 50 anos. Atua em prevenção e cuidados com o coração.",
    Neurologista: "Dra. Lúcia - Neurologista - 45 anos. Focada em doenças neurológicas e saúde mental.",
  };
  perfil.innerHTML = `<div class='perfil-container'><img class='perfil-img' src='${imagens[esp]}'><p>${textos[esp]}</p></div>`;

  const consulta = consultas.find((c) => c.especialidade === esp);
  const container = document.getElementById("consultaProfissional");
  container.innerHTML = consulta ? `<p><strong>${consulta.especialidade}</strong> às <strong>${consulta.horario}</strong></p>` : "<p>Nenhuma consulta marcada.</p>";
}

const leitos = [
  { numero: "101", status: "disponível" },
  { numero: "102", status: "ocupado" },
  { numero: "103", status: "manutenção" },
];

const suprimentos = [
  { nome: "Água", quantidade: 50 },
  { nome: "Luvas", quantidade: 200 },
  { nome: "Seringas", quantidade: 150 },
];

function renderizarLeitos() {
  const tabela = document.querySelector("#tabelaLeitos tbody");
  tabela.innerHTML = "";
  leitos.forEach(({ numero, status }) => {
    tabela.innerHTML += `<tr><td>${numero}</td><td>${status}</td></tr>`;
  });
}

function adicionarLeito() {
  const numero = document.getElementById("leito").value.trim();
  const status = document.getElementById("status").value;

  if (!numero) return alert("Informe o número do leito!");

  leitos.push({ numero, status });
  renderizarLeitos();

  document.getElementById("leito").value = "";
}

function renderizarSuprimentos() {
  const tabela = document.querySelector("#tabelaSuprimentos tbody");
  tabela.innerHTML = "";
  suprimentos.forEach(({ nome, quantidade }) => {
    tabela.innerHTML += `<tr><td>${nome}</td><td>${quantidade}</td></tr>`;
  });
}

function adicionarSuprimento() {
  const nome = document.getElementById("suprimento").value.trim();
  const quantidade = parseInt(document.getElementById("quantidade").value, 10);

  if (!nome || isNaN(quantidade) || quantidade <= 0) {
    return alert("Preencha corretamente os dados do suprimento!");
  }

  suprimentos.push({ nome, quantidade });
  renderizarSuprimentos();

  document.getElementById("suprimento").value = "";
  document.getElementById("quantidade").value = "";
}
