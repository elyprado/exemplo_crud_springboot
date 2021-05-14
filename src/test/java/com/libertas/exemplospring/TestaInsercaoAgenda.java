package com.libertas.exemplospring;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.libertas.exemplospring.pojo.Agendamento;
import com.libertas.exemplospring.repositorio.AgendamentoRepository;

public class TestaInsercaoAgenda {
	@Autowired
	private AgendamentoRepository _agendamentoRepository;
	
	public static void main(String[] args) {
		
	}
}
