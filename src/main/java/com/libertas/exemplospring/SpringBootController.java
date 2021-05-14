package com.libertas.exemplospring;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.libertas.exemplospring.pojo.Agendamento;
import com.libertas.exemplospring.repositorio.AgendamentoRepository;

@RestController
public class SpringBootController {
	
	@Autowired
	private AgendamentoRepository _agendamentoRepository;
	
	@RequestMapping(value = "/agendamento", method=RequestMethod.GET)
	public List<Agendamento> GetAgendamento() {
		return _agendamentoRepository.findAll();
	}
	
	@RequestMapping(value = "/agendamento/{id}", method=RequestMethod.GET)
	public ResponseEntity<Agendamento> GetAgendamentoById(@PathVariable(value="id") long id) {
		Optional<Agendamento> agendamento = _agendamentoRepository.findById(id);
		if (agendamento.isPresent()) {
			return new ResponseEntity<Agendamento>(agendamento.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value = "/agendamento", method=RequestMethod.POST)
	public Agendamento PostAgendamento(@Validated @RequestBody Agendamento agendamento) {
		return _agendamentoRepository.save(agendamento);
	}
	
	
	@RequestMapping(value = "/agendamento/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Agendamento> PutAgendamento(@PathVariable(value="id") long id, 
			@Validated @RequestBody Agendamento agendamento) {
		
		Optional<Agendamento> Oldagendamento = _agendamentoRepository.findById(id);
		if (Oldagendamento.isPresent()) {
			_agendamentoRepository.save(agendamento);
			return new ResponseEntity<Agendamento>(agendamento, HttpStatus.OK);
			
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@RequestMapping(value = "/agendamento/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Object> PutAgendamento(@PathVariable(value="id") long id) {
		
		Optional<Agendamento> agendamento = _agendamentoRepository.findById(id);
		if (agendamento.isPresent()) {
			_agendamentoRepository.delete(agendamento.get());
			return new ResponseEntity<>(HttpStatus.OK);
			
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@RequestMapping(value = "/teste", method=RequestMethod.GET)
	public String teste() {
		return "Olá Mundo";
	}
}
