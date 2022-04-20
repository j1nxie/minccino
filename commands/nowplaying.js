// necessary classes
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    description: 'displays currently playing song.',

    async execute(message, client, player) {
        const queue = player.getQueue(message.guildId);

        if (!queue) {
            return await message.channel.send({
                content: ':x: | no music is playing in this server',
                ephemeral: true,
            });
        }

        const currentTrack = queue.nowPlaying();

        const npEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`🎶 | now playing`)
            .setDescription(`[${currentTrack.title}](${currentTrack.url})`)
            .setThumbnail(currentTrack.thumbnail)
            .addFields(
                {
                    name: 'uploader',
                    value: currentTrack.author,
                    inline: true,
                },
                {
                    name: 'duration',
                    value: currentTrack.duration + "s",
                    inline: true,
                },
                /*{
                    name: 'requested by',
                    value: currentTrack.requestedBy.username,
                    inline: true,
                },*/
                {
                    name: 'views',
                    value: currentTrack.views.toString(),
                    inline: true,
                },
                {
                    name: 'progress bar',
                    value: queue.createProgressBar({ timecodes: true }),
                },
            );

        return await message.channel.send({ embeds: [npEmbed] });
    }
}
