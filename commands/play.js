// necessary classes
const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    description: 'play a song.',

    async execute(message, client, player, args) {
        // get ids of server and person the message was sent from
        const guild = await client.guilds.fetch(message.guildId);
        const author = await guild.members.fetch(message.author.id);

        if (author.voice.channelId == null) {
            message.channel.send('you are not in a voice channel.');
            return;
        }

        // create a queue for given server
        const queue = player.createQueue(message.guildId, {
            metadata: {
                channel: message
            }
        });

        // check for voice channel connection
        try {
            if (!queue.connection) await queue.connect(author.voice.channelId);
        } catch {
            queue.destroy();
            return await message.channel.send({
                content: 'could not join your voice channel!',
                ephemeral: true,
            });
        }

        // search for track with given query
        const track = await player.search(args, {
            requestedBy: message.author.username,
            searchEngine: QueryType.AUTO,
        });

        if (!track || !track.tracks.length)
            return await message.channel.send({
                content: `no video/song/playlist was found while searching for: ${track}`,
                ephemeral: true,
            });

        // create embed message
        const playEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(
                `🎶 | new ${track.playlist ? 'playlist' : 'song'} added to queue`
            );

        // create embed with thumbnail and description for single tracks
        if (!track.playlist) {
            const tr = track.tracks[0]
            playEmbed.setThumbnail(tr.thumbnail);
            playEmbed.setDescription(`${tr.title}`);
        }

        // if queue isn't playing, add tracks to queue and play them
        // if queue is playing, add tracks to queue
        if (!queue.playing) {
            track.playlist
                ? queue.addTracks(track.tracks)
                : queue.play(track.tracks[0]);
            return await message.channel.send({ embeds: [playEmbed] });
        } else if (queue.playing) {
            track.playlist
                ? queue.addTracks(track.tracks)
                : queue.addTrack(track.tracks[0]);
            return await message.channel.send({ embeds: [playEmbed] });
        }

        console.log(queue.tracks);
    }
}
