#!/usr/bin/env ruby
require "rubygems"
require "nokogiri"
require "json"
require "open-uri"
require "cgi"

class Teams
	
  def all
    teams = Array.new
		for division in ['Damsingel', 'HerrsingelDiv1', 'HerrsingelDiv2', 'HerrsingelDiv3'] do
			@doc = Nokogiri::HTML(open("http://idrottonline.se/ForeningenPartilleTennis-Tennis/Motionsserier/#{division}/"))
      load_team_info division
			@teams.each do |key, value|
			  teams << ({:team_name => scrub(value[:team_name]), :division => division, :team_ranking => scrub(key), :contact => scrub(value[:contact]), :phone => scrub(value[:phone]), :email => scrub(value[:email])})
			end
		end

    puts teams.to_json
  end

	private
	
  def scrub(value)
    if value.start_with? "KodChef"
      return "KodChef"
    end
    value = value.gsub("\r\n", "")
    value = value.gsub("&nbsp;", "")
    # If there is more than one space between words this will fix it
    return value.split(" ").join(" ")
  end

	def get_month_number(month)
		return "01" if month == "jan"
		return "02" if month == "feb"
		return "03" if month == "mar"
		return "04" if month == "apr"
		return "05" if month == "maj"
		return "06" if month == "jun"
		return "07" if month == "jul"
		return "08" if month == "aug"
		return "09" if month == "sep"
		return "10" if month == "okt"
		return "11" if month == "nov"
		return "12" if month == "dec"
	end

	def get_season(date)
		return "fall" if date.include?("aug") || date.include?("sep") || date.include?("okt") || date.include?("nov") || date.include?("dec")
		"spring"
	end

	def load_team_info(division)
		rows = @doc.css('.PageBodyDiv table:first tbody tr')
		@teams = Hash.new	
		rows.each do |row|
			cellContainers = row.css('td')
			cells = cellContainers
      next if cells.length < 3
			next if cells[1].content.strip.gsub("\r\n","") == 'Lag'
			team_ranking = cells[0].content.strip
      # puts team_ranking
			team_name = cells[1].content.strip.gsub("&nbsp;", "").gsub(/(\s|\u00A0)+/, ' ')
      # puts team_name
      email = get_email(cellContainers[2].css('p img'), division)
			phone = cells[3].content.strip
      phone = cells[4].content.strip if (cells.length > 4)
      phone = "0721-843748" if (team_name == "Johan Hellström" and phone.length < 2)

			@teams[team_ranking] = {:team_name => team_name, :contact => '', :phone => phone, :email => email}
		end
	end

  def get_email(email_cell, division)
    email = ''
    if email_cell[0] == nil
      email_cell = cellContainers[2].css('h2 img')
    end

    if email_cell[0] != nil
      email = email_cell[0].attributes["src"].value.gsub("/IdrottOnlineKlubb/Partille/foreningenpartilletennis-tennis/Motionsserier/#{division}/EmailEncoderEmbed.aspx?it=", "")	
      email = decode_email(CGI.unescape(email)).sub('mailto:', '').strip
    end
    email = 'kerstinblundin@gmail.com' if email == 'erstinblundin@gmail.com'
    email = 'ewabazar@yahoo.com' if email == 'wabazar@yahoo.com'
    email
  end

	def decode_email(value)
		c = '!#$()*,-./0123456789:;?ABCDEFGHIJKLMNOPQRSTUVWXYZ[ ]^_abcdefghijklmnopqrstuvwxyz{|}~'
		e = ''
		f = value.length
		g = 0

		while g < f
			h = value[g]
			i = c.index(h)

			case i
				when -1
					e << h
				when 1
					e << 10.chr
				when 2
					e << 13.chr
				when 3
					g += 1
					e << value[g]
				else
					e << (i + 28).chr
			end
			g += 1
		end

		e
	end
end

team = Teams.new
team.all
	
