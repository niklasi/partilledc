#!/usr/bin/env ruby

require "rubygems"
require "json"
require "nokogiri"
require "open-uri"
require "cgi"

class Matches
	
	def all
    matches = Array.new
		for division in 1..3 do
      schemaDiv = "Schemadiv.#{division}"
      # schemaDiv = "schemadiv#{division}" if division == 2
			@doc = Nokogiri::HTML(open("http://idrottonline.se/ForeningenPartilleTennis-Tennis/foretagsserier/#{schemaDiv}/"))
        rows = @doc.css('.PageBodyDiv table:last tbody tr')
        rows.each do |row|
          cells = row.css('td')
          home_team, away_team = cells[2].content.gsub("\r\n", "").strip.split('-', 2)
          next if (home_team == 'Lag')
          date = cells[0].content.gsub("\r\n", "").strip
          time = cells[1].content.gsub("\r\n", "").strip
          next if date == time
          lanes = cells[3].content.gsub("\r\n", "").strip.gsub(/(\s|\u00A0)+/, ' ')
          currentTime = Time.new
          
          date = "#{currentTime.year}-#{get_month(date)}-#{get_day(date)}"
          matches << {home_team: home_team, away_team: away_team, date: date, time: time, lanes: lanes, division: division}
          
        end
		end
    puts matches.to_json
	end

	private
	
  def get_day(date)
    day = date.split(" ")[0]
    return day if day.length > 1

    return "0#{day}"
  end

  def get_month(date)
		return "01" if date.include?("jan")
		return "02" if date.include?("feb")
		return "03" if date.include?("mar")
		return "04" if date.include?("apr")
		return "05" if date.include?("maj")
		return "06" if date.include?("jun")
		return "07" if date.include?("jul")
		return "08" if date.include?("aug")
    return "09" if date.include?("sep")
    return "10" if date.include?("okt")
    return "11" if date.include?("nov")
    return "12" if date.include?("dec")
  end

end

matches = Matches.new

matches.all
	
