#!/usr/bin/env ruby

require "rubygems"
require "json"
require "nokogiri"
require "open-uri"
require "cgi"

class Matches
	
	def all
    matches = Array.new
		for division in ['Damsingel', 'HerrsingelDiv1', 'HerrsingelDiv2', 'HerrsingelDiv3'] do
			@doc = Nokogiri::HTML(open("http://idrottonline.se/ForeningenPartilleTennis-Tennis/Motionsserier/#{division}/"))
        rows = @doc.css('.PageBodyDiv table:last tbody tr')
        rows.each do |row|
          cells = row.css('td')
          next if cells.length < 3
          date = cells[0].content.gsub("\r\n", "").strip
          time = cells[1].content.gsub("\r\n", "").strip
          home_team = cells[2].content.gsub("\r\n", "").strip
          away_team = cells[3].content.gsub("\r\n", "").strip
          next if (time == 'Tid')
          next if date == time
          lanes = cells[4].content.gsub("\r\n", "").strip.gsub(/(\s|\u00A0)+/, ' ')
          matches << {home_team: home_team, away_team: away_team, date: date, time: time, lanes: lanes, division: division}
          
        end
		end
    puts matches.to_json
	end

end

matches = Matches.new

matches.all
	
