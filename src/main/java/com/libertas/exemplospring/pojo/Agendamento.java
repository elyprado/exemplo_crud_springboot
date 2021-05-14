package com.libertas.exemplospring.pojo;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="agendamento")
public class Agendamento {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idagendamento;
	private Date data;
	private String horario;
	private String nomePaciente;
	private String telefonePaciente;
	private double valorConsulta;
	
	
	public long getIdagendamento() {
		return idagendamento;
	}
	public void setIdagendamento(long idagendamento) {
		this.idagendamento = idagendamento;
	}
	public Date getData() {
		return data;
	}
	public void setData(Date data) {
		this.data = data;
	}
	public String getHorario() {
		return horario;
	}
	public void setHorario(String horario) {
		this.horario = horario;
	}
	public String getNomePaciente() {
		return nomePaciente;
	}
	public void setNomePaciente(String nomePaciente) {
		this.nomePaciente = nomePaciente;
	}
	public String getTelefonePaciente() {
		return telefonePaciente;
	}
	public void setTelefonePaciente(String telefonePaciente) {
		this.telefonePaciente = telefonePaciente;
	}
	public double getValorConsulta() {
		return valorConsulta;
	}
	public void setValorConsulta(double valorConsulta) {
		this.valorConsulta = valorConsulta;
	}
	
	
}
